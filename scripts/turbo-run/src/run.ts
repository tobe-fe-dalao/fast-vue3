import type { Package } from '@fast-vue3/node-utils';

import { execaCommand, getPackages } from '@fast-vue3/node-utils';

import { cancel, isCancel, select } from '@clack/prompts';

interface RunOptions {
  command?: string;
}

type AppType = 'site' | 'web';

interface FrameworkApp {
  framework: string;
  packageName: string;
  type: AppType;
}

const UI_FRAMEWORKS = new Set([
  'antd',
  'arco',
  'ele',
  'idux',
  'naive',
  'primevue',
  'tdesign',
]);

const FRAMEWORK_LABELS: Record<string, string> = {
  antd: 'Ant Design Vue',
  arco: 'Arco Design',
  ele: 'Element Plus',
  idux: 'iDux',
  naive: 'Naive UI',
  primevue: 'PrimeVue',
  tdesign: 'TDesign',
};

function parseFrameworkApp(packageName: string): FrameworkApp | null {
  const matched = packageName.match(/^@fast-vue3\/(web|site)-([a-z0-9-]+)$/);
  if (!matched) {
    return null;
  }

  const [, type, framework] = matched;
  if (
    (type !== 'site' && type !== 'web') ||
    !framework ||
    !UI_FRAMEWORKS.has(framework)
  ) {
    return null;
  }

  return {
    framework,
    packageName,
    type,
  };
}

export async function run(options: RunOptions) {
  const { command } = options;
  if (!command) {
    console.error('Please enter the command to run');
    process.exit(1);
  }
  const { packages }: { packages: Package[] } = await getPackages();

  // 只显示有对应命令的包
  const selectPkgs = packages.filter((pkg) => {
    return (pkg?.packageJson as Record<string, any>)?.scripts?.[command];
  });

  if (command !== 'dev') {
    let selectPkg: string | symbol;
    if (selectPkgs.length > 1) {
      selectPkg = await select<string>({
        message: `Select the app you want to run [${command}]:`,
        options: selectPkgs.map((item) => ({
          label: item?.packageJson.name,
          value: item?.packageJson.name,
        })),
      });

      if (isCancel(selectPkg) || !selectPkg) {
        cancel('⚠️ Operation cancelled');
        process.exit(0);
      }
    } else {
      selectPkg = selectPkgs[0]?.packageJson?.name ?? '';
    }

    if (!selectPkg) {
      console.error('No app found');
      process.exit(1);
    }

    execaCommand(`pnpm --filter=${String(selectPkg)} run ${command}`, {
      stdio: 'inherit',
    });
    return;
  }

  const frameworkApps = selectPkgs
    .map((pkg) => pkg?.packageJson?.name)
    .filter((name): name is string => !!name)
    .map((name) => parseFrameworkApp(name))
    .filter(Boolean) as FrameworkApp[];

  const frameworkMap = new Map<string, FrameworkApp[]>();
  frameworkApps.forEach((item) => {
    const list = frameworkMap.get(item.framework) ?? [];
    list.push(item);
    frameworkMap.set(item.framework, list);
  });

  const frameworks = [...frameworkMap.keys()].toSorted();

  if (frameworks.length === 0) {
    console.error('No framework apps found for dev command');
    process.exit(1);
  }

  const selectedFramework = await select<string>({
    message: 'Select UI framework:',
    options: frameworks.map((framework) => {
      const apps = frameworkMap.get(framework) ?? [];
      const types = [...new Set(apps.map((item) => item.type))].toSorted();
      const frameworkLabel = FRAMEWORK_LABELS[framework] ?? framework;
      return {
        label: `${frameworkLabel} (${framework})`,
        hint: types.join(' / '),
        value: framework,
      };
    }),
  });

  if (isCancel(selectedFramework) || !selectedFramework) {
    cancel('⚠️ Operation cancelled');
    process.exit(0);
  }

  const appsInFramework = frameworkMap.get(selectedFramework) ?? [];
  const typeMap = new Map<AppType, FrameworkApp>();
  appsInFramework.forEach((item) => {
    if (!typeMap.has(item.type)) {
      typeMap.set(item.type, item);
    }
  });

  const appTypes = [...typeMap.keys()].toSorted();
  let selectPkg: string;

  if (appTypes.length > 1) {
    const selectedType = await select<AppType>({
      message: 'Select app type:',
      options: appTypes.map((type) => ({
        label: type,
        value: type,
      })),
    });

    if (isCancel(selectedType) || !selectedType) {
      cancel('⚠️ Operation cancelled');
      process.exit(0);
    }

    selectPkg = typeMap.get(selectedType)?.packageName ?? '';
  } else {
    selectPkg = typeMap.get(appTypes[0] as AppType)?.packageName ?? '';
  }

  if (!selectPkg) {
    console.error('No app found');
    process.exit(1);
  }

  execaCommand(`pnpm --filter=${selectPkg} run ${command}`, {
    stdio: 'inherit',
  });
}
