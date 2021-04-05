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
    images: {
        type: "array",
        default: []
    },
    // images: {
    //     type: 'array',
    //     default: [],
    //     source: 'query',
    //     selector: '.kadence-blocks-gallery-item',
    //     query: {
    //         url: {
    //             source: 'attribute',
    //             selector: 'img',
    //             attribute: 'data-full-image',
    //         },
    //         thumbUrl: {
    //             source: 'attribute',
    //             selector: 'img',
    //             attribute: 'src',
    //         },
    //         lightUrl: {
    //             source: 'attribute',
    //             selector: 'img',
    //             attribute: 'data-light-image',
    //         },
    //         link: {
    //             source: 'attribute',
    //             selector: 'img',
    //             attribute: 'data-link',
    //         },
    //         customLink: {
    //             source: 'attribute',
    //             selector: 'img',
    //             attribute: 'data-custom-link',
    //         },
    //         linkTarget: {
    //             source: 'attribute',
    //             selector: 'img',
    //             attribute: 'data-custom-link-target',
    //         },
    //         width: {
    //             source: 'attribute',
    //             selector: 'img',
    //             attribute: 'width',
    //         },
    //         height: {
    //             source: 'attribute',
    //             selector: 'img',
    //             attribute: 'height',
    //         },
    //         alt: {
    //             source: 'attribute',
    //             selector: 'img',
    //             attribute: 'alt',
    //             default: '',
    //         },
    //         id: {
    //             source: 'attribute',
    //             selector: 'img',
    //             attribute: 'data-id',
    //         },
    //         caption: {
    //             type: 'string',
    //             source: 'html',
    //             selector: '.kadence-blocks-gallery-item__caption',
    //         },
    //     },
    // },
    lightSize: {
        type: 'string',
        default: 'full',
    },
    thumbSize: {
        type: 'string',
        default: 'large',
    },
    ids: {
        type: 'array',
    },
    type: {
        type: 'string',
        default: 'masonry',
    },
    imageRatio: {
        type: 'string',
        default: 'land32',
    },
    linkTo: {
        type: 'string',
        default: 'none',
    },
    showCaption: {
        type: 'bool',
        default: false,
    },
    hoverStyle: {
        type: 'string',
        default: 'dark',
    },
    captionStyle: {
        type: 'string',
        default: 'bottom-hover',
    },
    captionStyles: {
        type: 'array',
        default: [ {
            size: [ '', '', '' ],
            sizeType: 'px',
            lineHeight: [ '', '', '' ],
            lineType: 'px',
            letterSpacing: '',
            textTransform: '',
            family: '',
            google: false,
            style: '',
            weight: '',
            variant: '',
            subset: '',
            loadGoogle: true,
            color: '',
            background: '#000000',
            backgroundOpacity: 0.5,
        } ],
    },
    captionAlignment: {
        type: 'string',
        default: 'center',
    },
    gutter: {
        type: 'array',
        default: [ 10, '', '' ],
    },
    carouselHeight: {
        type: 'array',
        default: [ 300, '', '' ],
    },
    imageRadius: {
        type: 'array',
        default: [ 0, 0, 0, 0 ],
    },
    autoPlay: {
        type: 'bool',
        default: false,
    },
    autoSpeed: {
        type: 'number',
        default: 7000,
    },
    transSpeed: {
        type: 'number',
        default: 400,
    },
    slidesScroll: {
        type: 'string',
        default: '1',
    },
    arrowStyle: {
        type: 'string',
        default: 'whiteondark',
    },
    dotStyle: {
        type: 'string',
        default: 'dark',
    },
    displayShadow: {
        type: 'bool',
        default: false,
    },
    shadow: {
        type: 'array',
        default: [ {
            color: '#000000',
            opacity: 0.2,
            spread: 0,
            blur: 14,
            hOffset: 4,
            vOffset: 2,
        } ],
    },
    shadowHover: {
        type: 'array',
        default: [ {
            color: '#000000',
            opacity: 0.2,
            spread: 0,
            blur: 14,
            hOffset: 4,
            vOffset: 2,
        } ],
    },
    imageFilter: {
        type: 'string',
        default: 'none',
    },
    lightbox: {
        type: 'string',
        default: 'none',
    },
    lightboxCaption: {
        type: 'bool',
        default: true,
    },
    margin: {
        type: 'array',
        default: [ {
            desk: [ '', '', '', '' ],
            tablet: [ '', '', '', '' ],
            mobile: [ '', '', '', '' ],
        } ],
    },
    marginUnit: {
        type: 'string',
        default: 'px',
    },
    carouselAlign: {
        type: 'bool',
        default: true,
    },
    thumbnailRatio: {
        type: 'string',
        default: 'land32',
    },
    thumbnailColumns: {
        type: 'array',
        default: [ 4, 4, 4, 4, 4, 4 ],
    },
    thumbnailControl: {
        type: 'string',
        default: 'linked',
    },
    mobileForceHover: {
        type: 'bool',
        default: false,
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
