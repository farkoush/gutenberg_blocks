/**
 * BLOCK: heroblock
 */

//  Import CSS.
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, AlignmentToolbar, BlockControls, MediaUpload  } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType( 'cgb/block-heroblock', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: 'carddd', // Block title.
    icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    keywords: [
        __( 'heroblock — CGB Block' ),
        __( 'CGB Example' ),
        __( 'create-guten-block' ),
    ],

    attributes: {
        content: {
           type: 'array',
           source: 'children',
           selector: 'p',
        },
        asidecontent: {
            type: 'array',
            source: 'children',
            selector: 'aside',
         },
        textAlignment: {
            type: 'string',
        },
        imageAlt: {
            attribute: 'alt',
            selector: '.card__image'
        },
        imageUrl: {
            attribute: 'src',
            selector: '.card__image'
        },
        imageAlt_2: {
            attribute: 'alt',
            selector: '.card__image_2'
        },
        imageUrl_2: {
            attribute: 'src',
            selector: '.card__image_2'
        }
     },
     supports: {
        align: true,
        align: [ 'left', 'right', 'wide', 'full' ],
    },

     edit: ( props ) => {
        const { attributes: { content, asidecontent, textAlignment, imageAlt, imageUrl, imageAlt_2, imageUrl_2 }, setAttributes, className } = props;

        const alignmentClass = (textAlignment != null) ? 'has-text-align-' + textAlignment : '';

        const onChangeContent = ( newContent ) => {
           setAttributes( { content: newContent } );
        };

        const onChangeAside = ( newAside ) => {
            setAttributes( { asidecontent: newAside } );
         };

        // Image Button function
         const getImageButton = (openEvent) => {
             if(imageUrl) {
                 return (
                     <img
                         src={ imageUrl }
                         onClick={ openEvent }
                         className="image"
                     />
                 );
             }
             else {
                 return (
                     <div className="button-container">
                         <Button
                             onClick={ openEvent }
                             className="button button-large"
                         >
                             Pick an image
                         </Button>
                     </div>
                 );
             }
         };

         const getImageButton2 = (openEvent) => {
            if(imageUrl_2) {
                return (
                    <img
                        src={ imageUrl_2 }
                        onClick={ openEvent }
                        className="image"
                    />
                );
            }
            else {
                return (
                    <div className="button-container">
                        <Button
                            onClick={ openEvent }
                            className="button button-large"
                        >
                            Pick an image
                        </Button>
                    </div>
                );
            }
        };


        return (
            <div className={alignmentClass, className}>
                <BlockControls>
                    <AlignmentToolbar
                        value={textAlignment}
                        onChange={(newalign) => setAttributes({ textAlignment: newalign })}
                    />
                </BlockControls>
                <MediaUpload
                    onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
                    type="image"
                    value={ props.imageID }
                    render={ ({ open }) => getImageButton(open) }
                />
                <MediaUpload
                    onSelect={ media => { setAttributes({ imageAlt_2: media.alt, imageUrl_2: media.url }); } }
                    type="image"
                    value={ props.imageID_2 }
                    render={ ({ open }) => getImageButton2(open) }
                />
                <RichText
                    tagName="p"
                    onChange={ onChangeContent }
                    value={ content } 
                />
                <RichText
                    tagName="aside"
                    onChange={ onChangeAside }
                    value={ asidecontent }
                />
           </div>
        );
     },
     save: ( props ) => {
        const { attributes } = props;
        const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';

         const cardImage = (src, alt) => {
             if(!src) return null;

             if(alt) {
                 return (
                     <img
                         className="card__image"
                         src={ src }
                         alt={ alt }
                     />
                 );
             }

             // No alt set, so let's hide it from screen readers
             return (
                 <img
                     className="card__image"
                     src={ src }
                     alt=""
                     aria-hidden="true"
                 />
             );
         };

         const cardImage_2 = (src, alt) => {
            if(!src) return null;

            if(alt) {
                return (
                    <img
                        className="card__image_2"
                        src={ src }
                        alt={ alt }
                    />
                );
            }

            // No alt set, so let's hide it from screen readers
            return (
                <img
                    className="card__image_2"
                    src={ src }
                    alt=""
                    aria-hidden="true"
                />
            );
        };


        return (
            <div className={alignmentClass}>
                { cardImage(attributes.imageUrl, attributes.imageAlt) }
                { cardImage_2(attributes.imageUrl_2, attributes.imageAlt_2) }
                <RichText.Content tagName="p" value={ props.attributes.content } />
                <RichText.Content tagName="aside" value={ props.attributes.asidecontent } />
            </div>
        )
     },
} );