#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

import minimist from 'minimist'
import prompts from 'prompts'
import { red, green, bold } from 'kolorist'
import { postOrderDirectoryTraverse } from './utils/directoryTraverse'
import getCommand from './utils/getCommand'
import clone from 'git-clone/promise'
import ora from 'ora'

async function loading(fn, message, ...args) {
  const spinner = ora(message)
  spinner.start()

  try {
    const result = await fn(...args)
    spinner.succeed()
    return result
  } catch (error) {
    console.log(error)
    spinner.fail('Request failed, refetch...')
  }
}

function changePackageInfo(root, packageName) {
  const pkgJSONPath = path.join(root, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgJSONPath))
  pkg.name = packageName
  pkg.version = '0.0.0'
  delete pkg.author
  fs.writeFileSync(pkgJSONPath, JSON.stringify(pkg, null, 2) + '\n')
}

function removeDir(root, dir) {
  const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function (file) {
        let curPath = path + '/' + file
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(path)
    }
  }

  deleteFolderRecursive(path.join(root, dir))
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
}

function toValidPackageName(projectName) {
  return String(projectName)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

function canSafelyOverwrite(dir) {
  return !fs.existsSync(dir) || fs.readdirSync(dir).length === 0
}

function emptyDir(dir) {
  postOrderDirectoryTraverse(
    dir,
    (dir) => fs.rmdirSync(dir),
    (file) => fs.unlinkSync(file)
  )
}

async function init() {
  const downloadUrl = 'https://gitee.com/maleweb/fast-vue3.git'
  const cwd = process.cwd()
  const argv = minimist(process.argv.slice(2))

  let targetDir = argv._[0]
  const defaultProjectName = !targetDir ? 'fast-vue3-demo' : targetDir

  const forceOverwrite = argv.force

  let result = {}

  try {
    result = await prompts(
      [
        {
          name: 'template',
          type: 'select',
          message: 'Choice a Template:',
          choices: [
            {
              title: 'template-pc',
              description: 'This will generate template for web scene',
              value: 'web'
            },
            {
              title: 'template-mobile',
              description: 'This will generate template for mobile scene',
              value: 'mobile'
            }
          ],
          initial: 0
        },
        {
          name: 'projectName',
          type: targetDir ? null : 'text',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: (state) => (targetDir = String(state.value).trim() || defaultProjectName)
        },
        {
          name: 'shouldOverwrite',
          type: () => (canSafelyOverwrite(String(targetDir)) || forceOverwrite ? null : 'confirm'),
          message: () => {
            const dirForPrompt =
              targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`
            return `${dirForPrompt} is not empty. Remove existing files and continue?`
          }
        },
        {
          name: 'overwriteChecker',
          type: (prev, values = {}) => {
            if (values.shouldOverwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          }
        },
        {
          name: 'packageName',
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    process.exit(1)
  }

  const { packageName = toValidPackageName(defaultProjectName), shouldOverwrite, template } = result
  const root = path.join(cwd, String(targetDir))

  if (shouldOverwrite) {
    emptyDir(root)
  }

  const templates = {
    web: 'main',
    mobile: 'mobile-template'
  }

  console.log(`\nScaffolding project in ${root}...`)

  await loading(clone, 'waiting download template', downloadUrl, root, {
    checkout: templates[template]
  })

  removeDir(root, 'packages')
  removeDir(root, '.git')
  changePackageInfo(root, packageName)

  const packageManager = /pnpm/.test(process.env.npm_execpath)
    ? 'pnpm'
    : /yarn/.test(process.env.npm_execpath)
    ? 'yarn'
    : 'npm'

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`   ${bold(green(`cd ${path.relative(cwd, root)}`))}`)
  }
  console.log(`  ${bold(green(getCommand(packageManager, 'install')))}`)
  console.log(`  ${bold(green(getCommand(packageManager, 'dev')))}`)
  console.log()
}

init().catch((e) => {
  console.error(e)
})
