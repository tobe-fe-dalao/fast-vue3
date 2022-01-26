/**
 * @name ConfigCompressPlugin
 * @description 开启.gz压缩
 */
import viteCompression from 'vite-plugin-compression';
import { COMPRESSION } from '../../constant';

export const ConfigCompressPlugin = () => {
    if (COMPRESSION) {
        return viteCompression({
            ext: '.gz',
            verbose: true,
            deleteOriginFile: false,
        })
    }
    return [];
}