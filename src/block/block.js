/**
 * BLOCK: questionscout
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import 'whatwg-fetch';
import { TextControl, ToggleControl, Spinner, SelectControl, IconButton } from '@wordpress/components';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { createElement, useEffect } = wp.element;

const qsIcon = createElement('svg', { width: 25, height: 22 },
	createElement('path', {
		d: 'M13.94 19.77c-2.471 1.038-6.105.342-7.62-2.255.784-.45 1.354-1.374 1.065-2.263-.061-.193-.332-.14-.372.037-.2.895-.68 1.712-1.687 1.786-.83.062-1.502-.369-1.906-1.073-.3-.522-.496-1.336-.008-1.818.575-.568 1.437-.279 1.962.203.174.158.386-.056.335-.246-.225-.85-1.186-1.243-2.008-1.015-.16.045-.306.118-.437.206.228-.268.522-.48.881-.578.26-.073.536-.089.8-.048.946-1.64 2.28-3.007 3.977-3.894 1.087-.567 2.395-1.247 3.616-1.4.956-.118 1.841.225 2.508.758-.005.273.008.543.037.811.124 1.189.544 2.308 1.01 3.44.005.014.01.028.016.04l.064.164c.07.177.14.356.204.541.407 1.16.658 2.458.22 3.762a4.718 4.718 0 01-2.657 2.841z',
		fill: '#FFF'
	}),
	createElement('path', {
		d: 'M7.421 7.58c4.616-2.985 9.06-4.387 10.173-3.251a1.007 1.007 0 01.069.082c.014.019.03.036.043.056l.018.035c.201.332.486 1.142-.337 2.422l2.45-.89a2.995 2.995 0 01.805-.172h.05c.67 0 1.349.386 1.864 1.06.26.342.473.754.612 1.191.502 1.591-.022 3.127-1.193 3.498-.1.032-.206.054-.314.067l-2.82.804a1.61 1.61 0 01-.48.072c-.261 0-.52-.062-.77-.174l-.714.201c.52 1.36.902 2.93.354 4.56a5.399 5.399 0 01-3.031 3.246 7.053 7.053 0 01-2.718.528c-2.273 0-4.619-1.025-5.8-3.159-1.283.292-2.517-.48-3.025-1.624-1.144.184-1.969.055-2.294-.448-.891-1.378 2.269-5.006 7.058-8.103zm7.482.922a1.831 1.831 0 00-1.832-.94l-.675.081c-1.223.152-2.387.601-3.474 1.169-1.697.886-3.03 2.255-3.976 3.892a1.96 1.96 0 00-.802.05c-.356.1-.65.31-.881.579.134-.088.278-.162.439-.207.82-.228 1.783.167 2.008 1.016.05.188-.163.403-.337.244-.524-.48-1.387-.77-1.962-.202-.487.481-.292 1.297.008 1.819.404.702 1.076 1.135 1.907 1.072 1.007-.076 1.487-.89 1.687-1.786.04-.176.31-.23.373-.038.29.889-.283 1.814-1.066 2.262 1.514 2.6 5.148 3.296 7.62 2.257a4.73 4.73 0 002.656-2.843c.49-1.456.12-2.905-.367-4.165l-.725.205a1.284 1.284 0 01-.385.057c-.783 0-1.546-.682-1.855-1.659-.374-1.176.033-2.32.926-2.605z',
		fill: '#000'
	}),
	createElement('path', {
		d: 'M20.664 6.397c.514-.013 1.055.31 1.467.849.217.286.402.637.527 1.03.405 1.283.027 2.547-.846 2.826-.083.024-.166.04-.251.048l-1.548.442c-.005.002-.01.002-.016.002l-1.304.372c-.34.109-.706.042-1.047-.157l-.726.203-1.56.44c-.598.19-1.307-.37-1.586-1.249-.278-.878-.019-1.743.578-1.933l1.32-.476.616-.223.14-.051c.146-.49.445-.86.862-.993l2.53-.918a.538.538 0 01.043-.017l.016-.005.14-.05c.181-.065.372-.113.564-.135.032-.002.06-.005.08-.005z',
		fill: '#FFF'
	}),
	createElement('path', {
		d: 'M10.96 14.453c.857-.003 1.65.404 2.504.426.613.015 1.206-.19 1.8-.315.157-.033.189.175.098.259-.156.145-.384.213-.494.406-.148.261-.082.755.069 1.005.111.186.346.012.482.179.121.148.076.38-.104.452-.606.243-1.208.5-1.837.677-1.321.374-3.04.41-3.94-.814-.821-1.116.222-2.271 1.421-2.275zm-.472.79a.971.971 0 00-.263.141c.072.028.145.061.228.096.267.112.54.205.814.297.353.119.715.226 1.089.254l.268.013c.044.003.089.009.133.017.225.046.35.193.073.276-.2.06-.426.03-.632.019-.747-.04-1.562-.052-2.203-.492.01.197.116.406.294.593.588.618 1.517.674 2.317.583.437-.05.93-.097 1.344-.236.213-.072.423-.154.63-.24-.187-.3-.272-.804-.22-1.21-.715.187-1.525.104-2.217-.039-.523-.108-1.133-.264-1.655-.073zm-5.14-.468c.277.237.408.58.402.943-.005.324-.067.756-.468.785-.135.01-.219-.1-.21-.226.014-.22.197-.363.209-.576.01-.183-.1-.409-.276-.48-.406-.163-.691.166-1.061.228a.127.127 0 01-.134-.063l-.017-.035c-.144-.354.228-.664.527-.762.369-.122.732-.068 1.029.186zm7.022-3.432c.381.253.05.816-.358.612-.282-.14-.573-.196-.872-.068-.302.13-.39.463-.667.59-.165.077-.36.02-.415-.169-.142-.482.44-.952.837-1.11a1.619 1.619 0 011.475.145zM11.287 9.21c.235.077.293.34.138.523-.15.178-.356.226-.557.33a2.653 2.653 0 00-.577.4 2.64 2.64 0 00-.448.54c-.118.186-.188.408-.363.548-.175.139-.5.123-.55-.145-.106-.556.402-1.162.787-1.519.367-.34 1.04-.85 1.57-.677zM9.985.418a6.607 6.607 0 011.532.803l.211.174c.539.45 1.047.937 1.519 1.457l.583.64s-.128-.014-.35-.014c-.113 0-.247.003-.402.014l-.12.008c-.081.008-.164.016-.25.027a6.324 6.324 0 00-.45.067l-.139.026a6.603 6.603 0 00-.399.097h-.002c-.086.024-.172.048-.257.075l-.073.024c-.045.013-.09.03-.139.045-.04.014-.08.027-.12.043-.094.03-.188.064-.284.102-.024.008-.049.016-.073.027a3.368 3.368 0 00-.187.072l-.083.032a12.908 12.908 0 00-1.858.932l-.185.128a30.23 30.23 0 00-.897.654c-.1.075-.198.15-.297.227-.134.102-.268.207-.402.314-2.118 1.687-3.848 3.473-4.946 5.01-.224-.485-1.036-2.389-.755-3.945.26-1.443 2.66-4.043 3.773-5.13l.019-.016c.265-.257.452-.426.52-.469.157-.101.685-.565 1.408-.964V.876h.005c.27-.15.568-.292.884-.402l.008-.003C8.462.231 9.227.14 9.985.418zm10.692 6.469c.273.005.549.137.793.359.07.061.136.128.2.203.091.107.18.23.257.364.102.177.19.373.258.584.315 1.002.064 1.982-.565 2.223l-.046.016-.112.026-.116.011h-.002a.93.93 0 01-.327-.053c-.3-.097-.594-.332-.83-.659a2.818 2.818 0 01-.399-.803c-.324-1.026-.05-2.027.61-2.236a.72.72 0 01.279-.035z',
		fill: '#000'
	})
);

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cgb/block-questionscout', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('QuestionScout'), // Block title.
	icon: qsIcon,
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('QuestionScout'),
		__('Form'),
		__('Survey'),
	],

	attributes: {
		loading: {
			type: 'boolean',
			default: false
		},
		key: {
			type: 'string',
			default: null
		},
		scaleHeight: {
			type: 'boolean',
			default: false
		},
		formId: {
			type: 'string',
			default: null
		},
		forms: {
			type: 'array',
			default: []
		},
		width: {
			type: 'string',
			default: '100'
		},
		widthType: {
			type: 'string',
			default: '%'
		},
		height: {
			type: 'string',
			default: '800'
		},
		heightType: {
			type: 'string',
			default: 'px'
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (props) => {
		const getForms = () => {
			props.setAttributes({ loading: true });

			fetch(`https://api2.questionscout.com/wordpress/forms?key=${props.attributes.key}`, {
				method: 'GET'
			}).then((res) => res.json()).then((data) => {
				props.setAttributes({ forms: data, loading: false });
			}).catch((err) => {
				props.setAttributes({ forms: [], loading: false });
			});
		};

		useEffect(() => {
			if (props.attributes.forms.length === 0 && props.attributes.key) getForms();
		}, []);

		useEffect(() => {
			if (props.attributes.key) getForms();
		}, [props.attributes.key]);

		return <div className={props.className}>
			<TextControl label="Api Key"
				className="questionscout-key"
				value={props.attributes.key}
				onChange={(value) => props.setAttributes({ key: value })}
			/>

			<div className="questionscout-key-help">You can find your individual API key for your account in the main settings, <a href="https://admin.questionscout.com/user/integrations" target="_blank">click here</a> to go there.</div>

			<div className="questionscout-form-row">
				<SelectControl label="Form"
					className="questionscout-form"
					disabled={props.attributes.loading || props.attributes.forms.length === 0}
					value={props.attributes.formId}
					options={props.attributes.forms.length > 0 ? [
						{ label: '-- Select Form --', value: null },
						...props.attributes.forms.map((form) => {
							return { label: form.name, value: form._id };
						})
					] : [
							{ label: '', value: null }
						]}
					onChange={(value) => props.setAttributes({ formId: value })}
				/>
				{props.attributes.loading && <Spinner />}
				{!props.attributes.loading && <span className="dashicons dashicons-image-rotate" onClick={() => getForms()}></span>}
			</div>

			<div className="questionscout-sizes-row">
				<div className="questionscout-size-row">
					<TextControl label="Width"
						value={props.attributes.width}
						disabled={props.attributes.scaleHeight}
						onChange={(value) => props.setAttributes({ width: value })}
					/>
					<SelectControl label={'\u00A0'}
						value={props.attributes.widthType}
						disabled={props.attributes.scaleHeight}
						options={[
							{ label: 'px', value: 'px' },
							{ label: '%', value: '%' }
						]}
						onChange={(value) => props.setAttributes({ widthType: value })}
					/>
				</div>

				<div className="questionscout-size-row">
					<TextControl label="Height"
						value={props.attributes.height}
						disabled={props.attributes.scaleHeight}
						onChange={(value) => props.setAttributes({ height: value })}
					/>
					<SelectControl label={'\u00A0'}
						value={props.attributes.heightType}
						disabled={props.attributes.scaleHeight}
						options={[
							{ label: 'px', value: 'px' },
							{ label: '%', value: '%' }
						]}
						onChange={(value) => props.setAttributes({ heightType: value })}
					/>
				</div>
			</div>

			<ToggleControl
				className="questionscout-form-scale"
				label="Scale to maximum with and height of the form"
				checked={props.attributes.scaleHeight}
				onChange={(value) => props.setAttributes({ scaleHeight: value })}
			/>
		</div>;
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: () => null
});