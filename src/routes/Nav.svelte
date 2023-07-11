<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let dark: boolean;
	let pre_font: string = 'font-lora';
	let selected_font: string;

	// Create a writable store for the theme state
	const theme = writable('light');
	const font = writable('font');

	onMount(() => {
		// Retrieve the theme state from local storage
		const storedTheme = localStorage.getItem('theme');
		if (
			storedTheme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.body.classList.add('dark');
			dark = true;
		}

		const storedFont = localStorage.getItem('font');
		if (storedFont) {
			document.body.classList.add(storedFont);
			pre_font = storedFont;
		}
	});

	// const body = document.body;

	// onMount(() => {
	// 	document.body.classList.add(pre_font);
	// });
</script>

<nav class="lg:w-4/6 mt-6 w-4/5 flex row justify-between items-center">
	<span>
		<svg class="w-8 dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><title>book-open-page-variant</title><path
				d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z"
			/></svg
		>
	</span>

	<div class="flex items-center gap-3">
		<form
			on:change={() => {
				console.log(selected_font);
				document.body.classList.remove(pre_font);
				document.body.classList.add(selected_font);
				pre_font = selected_font;

				localStorage.setItem('font', selected_font);
			}}
		>
			<select class="bg-inherit text-inherit w-16" bind:value={selected_font}>
				<option value="font-lora">Lora</option>
				<option value="font-sans">Sans</option>
			</select>
		</form>
		<div class="w-px h-6 bg-slate-500 opacity-50" />
		<button
			class="w-6"
			on:click={() => {
				if (document.body.classList.toggle('dark')) {
					dark = true;
					localStorage.setItem('theme', 'dark');
					return;
				}
				localStorage.setItem('theme', 'light');
				dark = false;
			}}
		>
			{#if dark}
				<svg class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>brightness-4</title><path
						d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"
					/></svg
				>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>brightness-6</title><path
						d="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z"
					/></svg
				>
			{/if}
		</button>
	</div>
</nav>
