import Markdown from 'vite-plugin-md'
import { MARKDOWN } from '../../constant'
const markdownWrapperClasses = 'felx mx-auto'
const markdownRenderer = require('markdown-it')();
import hljs from 'highlight.js';
export const ConfigMarkDownPlugin = () => {
    if (MARKDOWN) {
        return Markdown({
            markdownItOptions: {
                html: true,
                linkify: true,
                typographer: true,
                highlight: (str: any, lang: any) => {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return '<pre class="hljs"><code>' +
                                hljs.highlight(lang, str, true).value +
                                '</code></pre>';
                        } catch (__) {
                        }
                    }
                    return '<pre class="hljs"><code>' + markdownRenderer.utils.escapeHtml(str) + '</code></pre>';
                }
            },
            wrapperClasses: markdownWrapperClasses,
            markdownItSetup(md) {
                md.use(require('markdown-it-prism'))
                // md.use(require('markdown-it-prism'))
            },
        })
    }
}