const path = require('./paths');
const paths = require('./paths');

/*
    웹팩 환경 설정 파일 작성.
    빌드할 때 어떤 파일에서 시작해 파일들을 불러오는지,
    또 어디에 결과물을 저장할지 정해줌.
*/


/*
    로더 설정

    웹팩의 로더는 파일을 불러올 때 확장자에 맞게 필요한 처리를 해 줌.
    예를 들어 자바스크립트는 babel을 사용하여 트랜스파일링해 주고, CSS는 모든 CSS 코드를 결합해주고,
    이미지 파일은 파일을 다른 경로에 따로 저장하고 그 파일에 대한 경로를 자바스크립트에서 참조할 수 있게 해줌.

    서버 사이드 렌더링을 할 때 CSS 혹은 이미지 파일은 그다지 중요하지 않음.
    그렇다고 완전히 무시할 수는 없음.
    => 가끔 자바스크립트 내부에서 파일에 대한 경로가 필요하거나 CSSModule처럼 로컬 className을 참조해야 할 수도 있기 때문.
    그래서 해당 파일을 로더에서 별도로 설정하여 처리하지만 따로 결과물에 포함되지 않도록 구현할 수 있음.
*/

const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
// CSS Module의 고유 className을 만들 때 필요한 옵션
const webpack = require('webpack');
const getClientEnvironment = require('./env');
const nodeExternals = require('webpack-node-externals');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const publicUrl = paths.publicUrlOrPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);


module.exports = {
    mode: 'production', // 프로덕션 모드로 설정하여 최적화 옵션들을 활성화
    entry: paths.ssrIndexJs, // 엔트리 경로
    target: 'node', // node 환경에서 실행될 것이라는 점을 명시
    output: {
        path: paths.ssrBuild, // 빌드 경로
        filename: 'server.js', // 파일 이름
        chunkFilename: 'js/[name].chunk.js', // 청크 파일 이름
        publicPath: paths.publicUrlOrPath, // 정적 파일이 제공될 경로
    },
    module: {
        rules: [
            {
                oneOf: [
                    // 자바스크립트를 위한 처리
                    // 기존 webpack.config.js를 참고하여 작성
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve(
                                'babel-preset-react-app/webpack-overrides'
                            ),
                            plugins: [
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: '@svgr/webpack?-svgo![path]'
                                            }
                                        }
                                    }
                                ]
                            ],
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: false
                        }
                    },
                    // CSS를 위한 처리
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        // onlyLocals: true
                        // exportOnlyLocals: true
                        // 옵션을 설정해야 실제 CSS 파일을 생성하지 않음.
                        loader: require.resolve('css-loader'),
                        options: {
                            onlyLocals: true
                            // exportOnlyLocals: true
                        }
                    },
                    // CSS Module을 위한 처리
                    {
                        test: cssModuleRegex,
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: true,
                            onlyLocals: true,
                            // exportOnlyLocals: true
                            getLocalIdent: getCSSModuleLocalIdent
                        }
                    },
                    // Sass를 위한 처리
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    onlyLocals: true
                                    // exportOnlyLocals: true
                                }
                            },
                            require.resolve('sass-loader')
                        ]
                    },
                    // Sass + CSS Module을 위한 처리
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    modules: true,
                                    onlyLocals: true,
                                    // exportOnlyLocals: true,
                                    getLocalIdent: getCSSModuleLocalIdent
                                }
                            },
                            require.resolve('sass-loader')
                        ]
                    },
                    // url-loader를 위한 설정
                    {
                        test: [/\bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            emitFile: false, // 파일을 따로 저장하지 않는 옵션
                            limit: 10000, // 원래는 9.76KB가 넘어가면 파일로 저장하는데
                            // emitFile 값이 false일 때는 경로만 준비하고 파일은 저장하지 않음.
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    },
                    // 위에서 설정된 확장자를 제외한 파일들은
                    // file-loader를 사용함.
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        options: {
                            emitFile: false, // 파일을 따로 저장하지 않는 옵션
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules'] // 코드에서 node_modules 내부의 라이브러리를 불러올 수 있게 설정
        /*
            이렇게 했을 때 react, react-dom/server 같은 라이브러리를 import 구문으로 불러오면 node_modules에서 찾아 사용함.
            라이브러리를 불러오면 빌드할 때 결과물 파일 안에 해당 라이브러리 관련 코드가 함께 번들링 됨.

            브라우저에서 사용할 때는 결과물 파일에 리액트 라이브러리와 우리의 애플리케이션에 관한 코드가 공존해야 하는데,
            서버에서는 node_modules를 바로 불러와서 사용할 수 있기 때문에 굳이 결과물 파일 안에 리액트 라이브러리가 들어 있지 않아도 무방함.

            => 서버를 위해 번들링할 때는 node_modules에서 불러오는 것을 제외하고 번들링하는 것이 좋음.
            이를 위해 webpack-node-externals라는 라이브러리를 사용해야 함.
            
            $ yarn add webpack-node-externals
            명령어를 통해 라이브러리를 다운로드.
        */
    },
    externals: [nodeExternals()], // node_modules를 제외하고 번들링하기 위한 라이브러리.
    // 환경 변수 주입
    plugins: [
        new webpack.DefinePlugin(env.stringified) // 환경변수를 주입해 줌.
        // 환경 변수를 주입하면 프로젝트 내에서 process.env.NODE_ENV 값을 참조하여
        // 현재 개발 환경인지 아닌지 알 수 있음.
    ]
};