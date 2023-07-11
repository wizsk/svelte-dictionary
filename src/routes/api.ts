import { error } from '@sveltejs/kit';

const api_url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export async function getWord(word: string) {
	// if (word === '') return undefined;

	const res = await fetch(`${api_url}${word}`);

	if (!res.ok) {
		throw error(res.status, 'not found');
	}

	const jsn = (await res.json()) as word[];

	// if (jsn[0].phonetics[0] !== undefined) {
	// 	let audio: number = -1;
	// 	for (let i = 0; i <= jsn[0].phonetics.length; i++) {
	// 		console.log(jsn[0].phonetics[i].audio);
	// 		if (jsn[0].phonetics[i].audio !== '') {
	// 			audio = i as number;
	// 			break;
	// 		}
	// 	}
	// 	if (audio !== -1) console.log(jsn[0].phonetics[audio]);
	// } else if (jsn[0].phonetic !== undefined) {
	// 	console.log(jsn[0].phonetic);
	// } else {
	// 	console.log('nai');
	// }

	// console.log('mean', jsn[0].meanings);

	return jsn;
}

export function get_audio(words: word[]) {
	let text: string = '';
	let audio: string = '';

	loop: for (let i = 0; i < words.length; i++) {
		for (let j = 0; j < words[i].phonetics.length; j++) {
			if (words[i].phonetics[j].audio !== '') {
				text = words[i].phonetics[j].text;
				audio = words[i].phonetics[j].audio;
				break loop;
			}
		}
	}

	return { text, audio } as audio_txt;
}

export interface audio_txt {
	text: string;
	audio: string;
}

export interface dictionary {
	words: word[];
}

export interface word {
	word: string;
	phonetic: string;
	phonetics: phonetics[];
	meanings: meaning[];
}

interface phonetics {
	audio: string;
	sourceUrl: string;
	text: string;
}
interface meaning {
	partOfSpeech: string;
	definitions: definition[];
}

interface definition {
	definition: string;
	example: string;
	synonyms: string[];
	antonyms: string[];
}
