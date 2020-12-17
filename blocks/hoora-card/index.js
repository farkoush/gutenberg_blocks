const { RichText, MediaUpload, PlainText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// import './style.scss';
import './editor.scss';
import attributes from './attributes';

export default registerBlockType('hoora/card', {   
    title: 'Card',
    icon: 'heart',
    category: 'common',
    attributes,
      edit: props => {
        const { attributes, setAttributes, className, isSelected } = props;
        
        const onSelectImage = img => {
            setAttributes( {
                imgID: img.id,
                imageUrl: img.url,
                imageAlt: img.alt,
            } );
        };
        // media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } 
        const onSelectImage_2 = img => {
          setAttributes( {
              imgID_2: img.id,
              imageUrl_2: img.url,
              imageAlt_2: img.alt,
          } );
      };
        // media => { setAttributes({ imageAlt_2: media.alt, imageUrl_2: media.url }); }
        const getImageButton = (openEvent) => {
          if(attributes.imageUrl) {
              return (
                  <img
                      src={ attributes.imageUrl }
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
         if(attributes.imageUrl_2) {
             return (
                 <img
                     src={ attributes.imageUrl_2 }
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
            <div className="container">
                <MediaUpload
                    onSelect={ onSelectImage }
                    type="image"
                    value={ attributes.imageID }
                    render={ ({ open }) => getImageButton(open) }
                />
                <MediaUpload
                    onSelect={ onSelectImage_2 }
                    type="image"
                    value={ attributes.imageID_2 }
                    render={ ({ open }) => getImageButton2(open) }
                />
                <PlainText
                    onChange={ content => setAttributes({ title: content }) }
                    value={ attributes.title }
                    placeholder="Your card title"
                    className="heading"
                />
                <RichText
                    onChange={ content => setAttributes({ body: content }) }
                    value={ attributes.body }
                    multiline="p"
                    placeholder="Your card text"
                />
            </div>
        );
      },
      // save({ attributes }) {
      save: ( props ) => {
        const { attributes } = props;
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
          <div className="card">
            { cardImage(attributes.imageUrl, attributes.imageAlt) }
            { cardImage_2(attributes.imageUrl_2, attributes.imageAlt_2) }
            <div className="card__content">
              <h3 className="card__title">{ attributes.title }</h3>
              <div className="card__body">
                { attributes.body }
              </div>
            </div>
          </div>
        );
      }
  }
);