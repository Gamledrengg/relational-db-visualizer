import { writable } from 'svelte/store';

type datatable = {
	id: number;
	name: string;
	x: number;
	y: number;
};

export const tables = writable<datatable[]>([]);
