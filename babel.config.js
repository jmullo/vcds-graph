module.exports = function(api) {

    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
                loose: true
            }
        ],
        '@babel/preset-react'
    ];

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        'lodash'
    ];

    if (api.env('production')) {
        plugins.push(
            [
                '@babel/plugin-transform-classes',
                {
                    loose: true
                }
            ],
            [
                'transform-react-remove-prop-types',
                {
                    mode: 'remove',
                    removeImport: 'true'
                }
            ]
        );
    }

    return { presets, plugins };
};
