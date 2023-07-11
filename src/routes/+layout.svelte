<script lang="ts">
	import '../style.css';
	import Nav from './Nav.svelte';
</script>

<!-- <svelte:head>
	<head>
		<title>Dictionary</title>
	</head>
</svelte:head> -->

<main
	class="pb-16 bg-white dark:bg-zinc-950 dark:text-slate-50 lg:text-xl text-l flex flex-col items-center justify-top min-h-screen min-w-screen"
>
	<Nav />
	<slot />
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&display=swap');
</style>
