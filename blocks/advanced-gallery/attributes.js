/**
 * BLOCK: Kadence Accordion Attributes
 */
 const attributes = {
    uniqueID: {
        type: 'string',
    },
    columns: {
        type: 'array',
        default: [ 3, 3, 3, 2, 1, 1 ],
    },
    columnControl: {
        type: 'string',
        default: 'linked',
    },
    // images: {
    //     type: "array",
    //     default: []
    // },
    images: {
        type: 'array',
        default: [],
        source: 'query',
        selector: 'img',
        query: {
            id: {
                source: 'attribute',
                selector: 'img',
                attribute: 'data-id',
            },
            url: {
                source: 'attribute',
                selector: 'img',
                attribute: 'data-full-image',
            },
            thumbUrl: {
                source: 'attribute',
                selector: 'img',
                attribute: 'src',
            },
            // lightUrl: {
            //     source: 'attribute',
            //     selector: 'img',
            //     attribute: 'data-light-image',
            // },
            // link: {
            //     source: 'attribute',
            //     selector: 'img',
            //     attribute: 'data-link',
            // },
            alt: {
                source: 'attribute',
                selector: 'img',
                attribute: 'alt',
                default: '',
            },
            caption: {
                type: 'string',
                source: 'html',
                selector: '.kadence-blocks-gallery-item__caption',
            },

        },
    },
    ids: {
        type: 'array',
    },
    type: {
        type: 'string',
        default: 'masonry',
    },
    linkTo: {
        type: 'string',
        default: 'none',
    },

    autoplay: {
        type: "string",
        default: "true"
    },
    speed: {
        type: "string",
        default: "500"
    },
    delay: {
        type: "string",
        default: "5000"
    },
    loop: {
        type: "string",
        default: "true"
    },
    effect: {
        type: "string",
        default: "slide"
    },
};
export default attributes;
