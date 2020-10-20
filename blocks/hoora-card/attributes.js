const attributes = {
    title: {
        source: 'text',
        selector: '.card__title'
      },
      body: {
        type: 'array',
        source: 'children',
        selector: '.card__body'
      },
      imgID: {
        type: 'number',
    },
      imageAlt: {
        attribute: 'alt',
        selector: '.card__image'
      },
      imageUrl: {
        attribute: 'src',
        selector: '.card__image'
      },
      imgID_2: {
        type: 'number',
    },
      imageAlt_2: {
        attribute: 'alt',
        selector: '.card__image_2'
    },
    imageUrl_2: {
        attribute: 'src',
        selector: '.card__image_2'
    }
};

export default attributes;
