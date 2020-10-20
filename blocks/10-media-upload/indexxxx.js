/**
 * Block dependencies
 */
import icons from './icons';
import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    Editable,
    MediaUpload,
} = wp.editor;
const {
    Button,
} = wp.components;

/**
 * Register example block
 */
export default registerBlockType(
    'jsforwpblocks/media-uploadd',
    {
        title: __( 'Example - Media Upload Button', 'jsforwpblocks' ),
        description: __( 'An example of how to use the MediaUpload component.', 'jsforwpblocks'),
        category: 'common',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icons.upload,
        },         
        keywords: [
            __( 'Image', 'jsforwpblocks' ),
            __( 'MediaUpload', 'jsforwpblocks' ),
            __( 'Message', 'jsforwpblocks' ),
        ],
        attributes: {
            imgURL: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: 'img',
            },
            imgID: {
                type: 'number',
            },
            imgAlt: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',
            },
            imgURL2: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: 'img',
            },
            imgID2: {
                type: 'number',
            },
            imgAlt2: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',
            }
        },
        edit: props => {
            const { attributes: { imgID, imgURL, imgAlt, imgID2, imgURL2, imgAlt2 },
                className, setAttributes, isSelected} = props;
            const onSelectImage = img => {
                setAttributes( {
                    imgID: img.id,
                    imgURL: img.url,
                    imgAlt: img.alt,
                } );
            };
            const onRemoveImage = () => {
                setAttributes({
                    imgID: null,
                    imgURL: null,
                    imgAlt: null,
                });
            }
            const onSelectImage2 = img => {
                setAttributes( {
                    imgID2: img.id,
                    imgURL2: img.url,
                    imgAlt2: img.alt,
                } );
            };
            const onRemoveImage2 = () => {
                setAttributes({
                    imgID2: null,
                    imgURL2: null,
                    imgAlt2: null,
                });
            }
            return (
                <div className={ className }>
                    <div>
                        { ! imgID ? (
                            <MediaUpload
                                onSelect={ onSelectImage }
                                type="image"
                                value={ imgID }
                                render={ ( { open } ) => (
                                    <Button
                                        className={ "button button-large" }
                                        onClick={ open }
                                    >
                                        { icons.upload }
                                        { __( ' Upload Image', 'jsforwpblocks' ) }
                                    </Button>
                                ) }
                            >
                            </MediaUpload>

                        ) : (

                            <p class="image-wrapper">
                                <img
                                    src={ imgURL }
                                    alt={ imgAlt }
                                />

                                { isSelected ? (

                                    <Button
                                        className="remove-image"
                                        onClick={ onRemoveImage }
                                    >
                                        { icons.remove }
                                    </Button>

                                ) : null }

                            </p>
                        )}
                    </div>
                    <div>
                        { ! imgID2 ? (

                            <MediaUpload
                                onSelect={ onSelectImage2 }
                                type="image"
                                value={ imgID2 }
                                render={ ( { open } ) => (
                                    <Button
                                        className={ "button button-large" }
                                        onClick={ open }
                                    >
                                        { icons.upload }
                                        { __( ' Upload Image', 'jsforwpblocks' ) }
                                    </Button>
                                ) }
                            >
                            </MediaUpload>

                        ) : (

                            <p class="image-wrapper">
                                <img
                                    src={ imgURL2 }
                                    alt={ imgAlt2 }
                                />

                                { isSelected ? (

                                    <Button
                                        className="remove-image"
                                        onClick={ onRemoveImage2 }
                                    >
                                        { icons.remove }
                                    </Button>

                                ) : null }

                            </p>
                        )}
                        </div>

                </div>
            );
        },
        save: props => {
            const { imgURL, imgAlt, imgID, imgURL2, imgAlt2, imgID2 } = props.attributes;
            console.log(props.attributes);
            console.log(imgURL,imgURL2);
            return (
                <div>
                    <p>
                        <img
                            src={ imgURL }
                            alt={ imgAlt }
                        />
                        <img
                            src={ imgURL2 }
                            alt={ imgAlt2 }
                        />
                    </p>
                </div>
            );
        },
    },
);
