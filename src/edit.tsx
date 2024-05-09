import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockAttributes, BlockEditProps } from '@wordpress/blocks';
import './editor.scss';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const WPCF7_POST_TYPE = 'wpcf7_contact_form'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes }: BlockEditProps< BlockAttributes > ): JSX.Element {
	const { selected } = attributes;

	const [ form, setForms ] = useState(
		undefined as { value: string; label: string; slug: string }[] | undefined
	);

	/**
	 * Get all forms from WPCF7 post-type and store them in state
	 */
	const wpcf7Forms = useSelect( ( select ) => {
		const core = select( coreStore );
		const query = {
			per_page: -1,
		};
		return core.getEntityRecords( 'postType', WPCF7_POST_TYPE, query );
	}, [coreStore] ) as { id: number; slug: string; title: { rendered: string } }[];

	/**
	 * Set parsed form data in state when WPCF7 post-type is loaded
	 */
	useEffect( () => {
		if ( wpcf7Forms ) {
			//console.log(forms)
			setForms(
				wpcf7Forms?.map( ( form ) => {
					return {
						value: form.id.toString(),
						label: form.title.rendered,
						slug: form.slug
					};
				} )
			);
		}
	}, [ wpcf7Forms ] );

	return (
		<div { ...useBlockProps() }>
			<select>
				{ form?.map( ( { value, label, slug } ) => {
					return (
						<option
							key={slug}
							value={ value }
							label={ label }
							selected={ selected === value }
							onClick={ () => {
								setAttributes({selected: value});
							} }
						/>
					);
				} ) }
			</select>
		</div>
	);
}
