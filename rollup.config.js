import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const moduleName = 'Uploader';
const distName = 'dnm-react-uploader';

const external = {
    es: [
        'react', 
        'react-dom', 
        'prop-types', 
        'lodash-es/camelCase',
        'lodash-es/concat',
        'lodash-es/debounce',
        'lodash-es/difference',
        'lodash-es/get',
        'lodash-es/isString',
        'lodash-es/last',
        'lodash-es/map',
        'lodash-es/round',
        'lodash-es/upperCase',
        'lodash-es/upperFirst',
        'lodash-es/split',
        'validator/lib/isURL'
    ],
    umd: ['react', 'react-dom', 'prop-types']
};

const rollupConfig = ['es', 'umd'].map(format => ({
    input: 'src/index.js',
    output: {
        file: `dist/${distName}.${format}`,
        format,
        name: moduleName,
        globals: format === 'umd' ? {
            react: 'React',
            'react-dom': 'ReactDOM',
            'prop-types': 'PropTypes',
        } : null
    },
    external: external[format],
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**'
        }),
        commonjs(),
        postcss({
            extensions: ['.css']
        })
    ]
}));

export default rollupConfig;