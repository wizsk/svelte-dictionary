<script lang="ts">
	import type { audio_txt, word } from '../api';

	export let datas: word[];
	export let audio_buff: HTMLAudioElement;
	export let audio: audio_txt | undefined;

	let showmore_btn: HTMLButtonElement;
</script>

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
							class="fill-purple-500 p-3 rounded-full bg-purple-300/[0.1] w-14 h-14"
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

<style>
	.hidden {
		display: none;
	}
</style>
