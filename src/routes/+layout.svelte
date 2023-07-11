<script lang="ts">
	import '../style.css';
	import Nav from './Nav.svelte';

	import { onMount } from 'svelte';

	let dark: boolean;
	let pre_font: string = 'font-lora';

	onMount(() => {
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
		} else {
			document.body.classList.add(pre_font);
			localStorage.setItem('font', pre_font);
		}
	});
</script>

<main
	class="pb-16 dark:bg-zinc-950 dark:text-slate-50 lg:text-xl text-l flex flex-col items-center justify-top min-h-screen min-w-screen"
>
	<Nav {dark} {pre_font} />
	<slot />
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&display=swap');
</style>
