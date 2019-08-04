import autoPreprocess from 'svelte-preprocess';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import {
    terser
} from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        sourcemap: 'inline',
        format: 'iife',
        name: 'app',
        file: 'public/bundle.js'
    },
    plugins: [
        svelte({
            preprocess: autoPreprocess({
                postcss: true
            }),
            // enable run-time checks when not in production
            dev: !production,
            css: css => {
                css.write('public/components.css');
            }
        }),
        postcss({
            extract: 'public/utils.css',
        }),
        resolve({
            browser: true
        }),
        commonjs(),
        !production && livereload('public'),
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};
