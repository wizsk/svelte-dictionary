<script lang="ts">
	import { onMount } from 'svelte';
	import { getWord, type audio_txt, type word, pronouce } from '../api';

	import { page } from '$app/stores';

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
			audio = pronouce(datas);
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
		{#each datas as data, data_idx}
			<div class={data_idx > 0 ? 'hidden' : ''}>
				<div class="flex justify-between items-center">
					{#if audio && data_idx === 0}
						<div>
							<div class="lg:text-5xl text-3xl font-bold">{data.word}</div>
							<div class="text-purple-500 mt-3">{audio.text}</div>
						</div>

						<div class="text-audio">
							<button
								class="w-8 h-8 mr-10"
								on:click={async () => {
									audio_buff.play();
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="fill-purple-500 p-3 rounded-full bg-purple-300/[0.1]"
									><title>volume-high</title><path
										d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
									/></svg
								>
							</button>
						</div>
					{:else if data_idx === 0}
						<div class="lg:text-5xl text-3xl font-bold">{data.word}</div>
					{:else}
						<div class="lg:text-5xl text-3xl font-bold">Another dictinary</div>
					{/if}
				</div>

				<dl>
					{#each data.meanings as means}
						<dt class="flex items-center gap-4 mt-6">
							<span class="text-xl font-bold">{means.partOfSpeech}</span>
							<hr class="border-zinc-300 dark:border-zinc-700 w-full" />
						</dt>
						<div class="text-l opacity-50 mt-4">Meaning</div>
						<dd class="ml-6">
							{#each means.definitions as def, i}
								<div class="{i > 2 ? 'hidden' : ''} my-4">
									<div><span class="text-purple-500">{i + 1}.</span> {def.definition}</div>
									{#if def.example}
										<div><span class="example" />{def.example}</div>
									{/if}
								</div>
							{/each}
						</dd>
					{/each}
				</dl>
			</div>
		{/each}

		{#if datas.length > 1}
			<button
				class="flex items-center w-full"
				bind:this={showmore_btn}
				on:click={() => {
					showmore_btn.style.display = 'none';
					document.querySelectorAll('.hidden').forEach((itm) => {
						itm.classList.remove('hidden');
					});
				}}
				><hr class=" dark:border-zinc-700 border-zinc-300 w-full" />
				<span
					class="whitespace-nowrap px-3 py-2 border rounded-3xl dark:border-zinc-700 border-zinc-300"
					>Show more</span
				>
				<hr class="w-full dark:border-zinc-700 border-zinc-300" /></button
			>
		{/if}
	{:else}
		<p>{msg}</p>
	{/if}
</div>

<style>
	.hidden {
		display: none;
	}
</style>
