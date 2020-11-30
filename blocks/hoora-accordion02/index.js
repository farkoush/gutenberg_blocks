import times from "lodash/times";
import memoize from "memize";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {RichText,AlignmentToolbar,BlockControls,InspectorControls,PanelColorSettings, InnerBlocks} = wp.editor;
const { TextControl, PanelBody, PanelRow, RangeControl, SelectControl, ToggleControl } = wp.components;

/* Parent Accordion Block */
registerBlockType('gca/custom-accordion',{
    title: __('Custom Accordion'),
    description: __('This is custom accordion block.'),
    icon: 'editor-justify',
    category: 'formatting',
    keywords: [__('accordion'), __('gutenberg'), __('faq')],
    attributes: {
        noOfAccordion: {
            type: 'number',
            default: 3
        },
        blockId: {
            type: 'string',
        }
    },
    edit: (props) => {
        const {
            attributes:{noOfAccordion,},
            className,
            setAttributes,
            clientId,
    } = props;
    setAttributes ({blockId:clientId});
    const ALLOWBLOCKS = ['gca/accordion'];
    const getChildAccordionBlock = memoize(accordion => {
        return times(accordion, n => ["gca/accordion", { id: n + 1 }]);
      });
      return(
        <fragment>
            <div className = {{className}}>
            <div className="accordionParentWrapper">
            <InnerBlocks
             template={getChildAccordionBlock(noOfAccordion)}
             templateLock="all"
             allowedBlocks={ALLOWBLOCKS}
           />
           <span className="dashicons dashicons-plus" onClick = {() => setAttributes ({noOfAccordion: noOfAccordion + 1 })}></span>
           <span className="dashicons dashicons-minus" onClick = {() => setAttributes ({noOfAccordion: noOfAccordion - 1 })}></span>
            </div>
            </div>
        </fragment>
      );
    },
    save: (props) => {
        const {
            attributes:{noOfAccordion,},
            className,
            setAttributes,
            clientId
    } = props;
    return( 
        <InnerBlocks.Content />
        );
    }

});

/* Accordion Block */
registerBlockType( 'gca/accordion', {
    title: __( 'Accordion Block' ),
    description:__('This is custom accordion block with multiple setting.'),
    category: 'formatting',
    parent: ['gca/parent-accordion'],
    attributes: {
        title: {
            type: 'string',
            selector: 'h4',
        },        
        open: {
            type: 'boolean',
            default: false,
        },
        alignment: {
            type: 'string',
            default: 'unset',
        },
        headerTextFontSize: {
            type: 'string',
            default: '22px'
        },
        headerTextColor: {
            type: 'string',
            default: '#fff',
        },
        titleBackgroundColor: {
            type: 'string',
            default: '#26466d',
        },
        titlePaddingTop: {
            type: 'number',
            default: 10
        },
        titlePaddingRight: {
            type: 'number',
            default: 40
        },
        titlePaddingBottom: {
            type: 'number',
            default: 10
        },
        titlePaddingLeft: {
            type: 'number',
            default: 10
        },
        bodyTextColor: {
            type: 'string',
            default: '#26466d'
        },
        bodyBgColor: {
            type: 'string',
            default: '#f7f7f7'
        },
        borderWidth: {
            type: 'number',
            default: 0
        },
        borderType: {
            type: 'string',
        },
        borderColor: {
            type: 'string',
            default: '#000'
        },
        borderRadius: {
            type: 'number',
            default: 3
        }
    },
    edit: ( props ) => {
        const {attributes, setAttributes, className} = props;
        const {
            title,
            open,
            alignment,
            headerTextFontSize,
            headerTextColor,
            titleBackgroundColor,
            titlePaddingTop,
            titlePaddingRight,
            titlePaddingBottom,
            titlePaddingLeft,
            bodyTextColor,
            bodyBgColor,
            borderWidth,
            borderType,
            borderColor,
            borderRadius
        } = attributes;
        return (
            <div className= {{ className }}>
                <div className='accordionWrapper' style={{borderWidth: borderWidth +'px',borderStyle: borderType, borderColor: borderColor, borderRadius:borderRadius + 'px'}}>
                    <div className='accordionHeader'>
                        <RichText
                            tagName="h4"
                            value={ title }
                            style={ { fontSize: headerTextFontSize, textAlign: alignment, color: headerTextColor, backgroundColor: titleBackgroundColor, paddingTop: titlePaddingTop + 'px', paddingRight: titlePaddingRight + 'px', paddingBottom: titlePaddingBottom + 'px', paddingLeft: titlePaddingLeft + 'px'} }
                            onChange={ (value) => setAttributes( { title: value } ) }
                            placeholder={ __('Accordion Header') }
                        />
                    </div>
                    <div className='accordionBody' style={{backgroundColor:bodyBgColor,color:bodyTextColor}}>
                       <InnerBlocks templateLock={false}></InnerBlocks>
                    </div>
                </div>
            <InspectorControls>
                <panelBody title={__('Accordion Title Setting')} initialOpen={false}>
                <panelRow>
                    <label><b>Title Setting</b></label>
                        <ToggleControl
                            label={ __( 'Accordion Open' ) }
                            checked={ !! open }
                            onChange={ () => setAttributes( {  open: ! open } ) }
                        />
                        </panelRow>
                        <panelRow>
                        <label><b>Title Alignment</b></label>
                        <AlignmentToolbar
                            value={ alignment }
                            onChange={ (value) => setAttributes({alignment: value}) }
                        />
                        </panelRow>
                        <panelRow>
                        <TextControl
                                type="string"
                                label = "Header Font Size"
                                value={headerTextFontSize}
                                onChange={value => setAttributes({ headerTextFontSize: value })}
                                />                        
                    </panelRow>
                </panelBody>
                <panelBody>
                    <panelRow>
                    <PanelColorSettings
                            title={ __('Color Settings') }
                            initialOpen={ false }
                            colorSettings={ [
                                {
                                    label: __('Background Color'),
                                    value: titleBackgroundColor,
                                    onChange: (value) => setAttributes({titleBackgroundColor: value ? value : '#26466d'}),
                                },
                                {
                                    label: __('Text Color'),
                                    value: headerTextColor,
                                    onChange: (value) => setAttributes({headerTextColor: value ? value : '#fff'}),
                                },
                            ] }
                        />
                    </panelRow>
                </panelBody>
                <panelBody>
                    <panelRow className = 'titlePadding'>
                        <label><b>Header Padding Setting</b></label>
                        <TextControl
                              type="number"
                              label = "Padding Top"
			                  value={titlePaddingTop}
			                  onChange={value => setAttributes({ titlePaddingTop: value })}
			                />
                            <TextControl
                              type="number"
                              label = "Padding Right"
			                  value={titlePaddingRight}
			                  onChange={value => setAttributes({ titlePaddingRight: value })}
			                />
                            <TextControl
                              type="number"
                              label = "Padding Bottom"
			                  value={titlePaddingBottom}
			                  onChange={value => setAttributes({ titlePaddingBottom: value })}
			                />
                            <TextControl
                              type="number"
                              label = "Padding Left"
			                  value={titlePaddingLeft}
			                  onChange={value => setAttributes({ titlePaddingLeft: value })}
			                />
                    </panelRow>
                </panelBody>
                <panelBody title={__('Accordion Body Setting')} initialOpen={false}>
                <label><b>Accordion Body Style</b></label>
                    <PanelColorSettings
                        title={ __('Color Settings') }
                        initialOpen={ false }
                        colorSettings={ [
                            {
                                label: __('Background Color'),
                                value: bodyBgColor,
                                onChange: (value) => setAttributes({bodyBgColor: value ? value : '#f7f7f7'}),
                            },
                            {
                                label: __('Text Color'),
                                value: bodyTextColor,
                                onChange: (value) => setAttributes({bodyTextColor: value ? value : '#26466d'}),
                            },
                        ] }
                    />
                    <RangeControl
                        label={__('Border Width')}
                        value={borderWidth}
                        min="1"
                        max="100"
                        step="1"
                        onChange={(value) => setAttributes({borderWidth: value})}
                    />
                    <SelectControl
                                label={ __('Border Type') }
                                value={ borderType }
                                options={ [
                                    {label: __('Border Type'), value: ''},
                                    {label: __('Solid'), value: 'solid'},
                                    {label: __('Dashed'), value: 'dashed'},
                                    {label: __('Dotted'), value: 'dotted'},
                                ] }
                                onChange={ (value) => setAttributes({borderType: value}) }
                    />
                    <PanelColorSettings
                        title={ __('Border Color') }
                        initialOpen={ false }
                        colorSettings={ [
                            {
                                label: __('Border Color'),
                                value: borderColor,
                                onChange: (value) => setAttributes({borderColor: value}),
                            },
                        ] }
                    />
                    <TextControl
                              type="numer"
                              label = "Border Radius"
			                  min="3"
			                  value={borderRadius}
			                  onChange={value => setAttributes({ borderRadius: value })}
			                />
                </panelBody>
            </InspectorControls>
            </div>
        );
    },
    save: ( props ) => { 
        const {attributes, className} = props;
        const {
            title,
            open,
            alignment,
            headerTextFontSize,
            headerTextColor,
            titleBackgroundColor,
            titlePaddingTop,
            titlePaddingRight,
            titlePaddingBottom,
            titlePaddingLeft,
            bodyTextColor,
            bodyBgColor,
            borderWidth,
            borderType,
            borderColor,
            borderRadius
        } = attributes;
        const tabOpen = open ? 'tabOpen' : 'tabClose';
        const bodyDisplay = open ? 'block' : 'none';
        return (
                <div className={'accordionWrapper' +' ' +tabOpen} style={{borderWidth: borderWidth +'px', borderStyle: borderType, borderColor: borderColor, borderRadius:borderRadius + 'px'}}>
                    <div className='accordionHeader'>
                        <RichText.Content
                            tagName="h4"
                            value={ attributes.title }
                            style={ { fontSize: headerTextFontSize, textAlign: alignment, color: headerTextColor, backgroundColor: titleBackgroundColor, paddingTop: titlePaddingTop + 'px', paddingRight: titlePaddingRight + 'px', paddingBottom: titlePaddingBottom + 'px', paddingLeft: titlePaddingLeft + 'px'} }
                        />
                    </div>
                    <div className='accordionBody' style={{backgroundColor:bodyBgColor,color:bodyTextColor, display: bodyDisplay}}>
                    <InnerBlocks.Content/>
                    </div>
                </div>            
    );
    },
    deprecated: [
        {
            attributes: {
                titlePaddingTop: {
            type: 'number',
            default: 10
        },
        titlePaddingRight: {
            type: 'number',
            default: 40
        },
        titlePaddingBottom: {
            type: 'number',
            default: 10
        },
        titlePaddingLeft: {
            type: 'number',
            default: 10
        }
            },
 
            migrate: function( attributes ) {
                return {
                    content: attributes.text
                };
            },
 
            save: ( props ) => { 
        const {attributes, className} = props;
        const {
            titlePaddingTop,
            titlePaddingRight,
            titlePaddingBottom,
            titlePaddingLeft,
            borderWidth,
            borderType,
            borderColor,
            borderRadius,
            headerTextFontSize,
            alignment,
            headerTextColor,
            titleBackgroundColor,
            title,
            bodyBgColor,
            bodyTextColor
        } = attributes;
        const tabOpen = open ? 'tabOpen' : 'tabClose';
        const bodyDisplay = open ? 'block' : 'none';
        return (
                <div className={'accordionWrapper' +' ' +tabOpen} style={{borderWidth: borderWidth +'px', borderStyle: borderType, borderColor: borderColor, borderRadius:borderRadius + 'px'}}>
                    <div className='accordionHeader'>
                        <h4 style={ { fontSize: headerTextFontSize, textAlign: alignment, color: headerTextColor, backgroundColor: titleBackgroundColor, paddingTop: titlePaddingTop + 'px', paddingRight: titlePaddingRight + 'px', paddingBottom: titlePaddingBottom + 'px', paddingLeft: titlePaddingLeft + 'px' } }>{ title }</h4>
                    </div>
                    <div className='accordionBody' style={{backgroundColor:bodyBgColor,color:bodyTextColor, display: bodyDisplay}}>
                    <InnerBlocks.Content/>
                    </div>
                </div>            
    );
    },
        }
    ]
});