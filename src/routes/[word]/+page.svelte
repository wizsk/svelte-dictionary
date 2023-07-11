<script lang="ts">
	import { onMount } from 'svelte';
	import { getWord, type audio_txt, type word, get_audio } from '../api';

	import { page } from '$app/stores';
	import Body from './Body.svelte';

	console.log();
	let word = $page.params.word;

	let audio_buff: HTMLAudioElement;
	let audio_player: HTMLAudioElement;
	let datas: word[] | undefined;
	let audio: audio_txt | undefined;
	let msg: string = 'search';
	let showmore_btn: HTMLButtonElement;

	async function handleform() {
		audio = undefined;
		datas = undefined;
		msg = 'loading';
		try {
			datas = await getWord(word.toLocaleLowerCase());
			audio = get_audio(datas);
			if (audio) audio_buff = new Audio(audio.audio);
		} catch {
			msg = 'not found';
		}
	}

	let input: HTMLInputElement;
	onMount(() => {
		handleform();
	});
</script>

<div class="lg:w-4/6 w-11/12 mt-6 transition-all duration-500">
	<form action="/{word}" on:submit={handleform} class="flex items-center mb-5">
		<input
			bind:this={input}
			class="w-full p-4 text-2xl border-0 bg-slate-200 dark:bg-zinc-800 rounded-2xl outline-none focus:outline-purple-500"
			type="text"
			placeholder="search a word"
			bind:value={word}
			required
		/>
		<button class="-ml-14 p-4">
			<svg
				class="bi bi-search fill-purple-500"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16"
			>
				<path
					d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
				/>
			</svg>
		</button>
	</form>

	{#if datas}
		<Body {datas} {audio} {audio_buff} />
	{:else}
		<p>{msg}</p>
	{/if}
</div>
