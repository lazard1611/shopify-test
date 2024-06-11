
import { resolve as _resolve } from 'path';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entriesObject = {};
entriesObject['application.js'] = _resolve(__dirname, 'src/scripts/application.js');
readdirSync('./src/scripts/sections', { withFileTypes: true }).forEach(file => {
    entriesObject[file.name] = _resolve(__dirname, `src/scripts/sections/${file.name}`);
});

export default {
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    entry: entriesObject,
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        emitFile: false,
                        esModule: false
                    }
                  }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.m?js/,
                type: "javascript/auto"
            },
            {
                test: /\.m?js/,
                resolve: {
                  fullySpecified: false,
                }
            }
        ]
    },
}
