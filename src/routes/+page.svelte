<script lang="ts">
	import panzoom, { type PanZoom } from 'panzoom';
	import { tables } from '../tables';
	import { onMount } from 'svelte';

	let instance: PanZoom;

	function initPanzoom(node: SVGGElement) {
		instance = panzoom(node, {
			smoothScroll: true,
			// autocenter: true,
			maxZoom: 5,
			minZoom: 0.5,
			bounds: true,
			zoomDoubleClickSpeed: 1, // Disable default doubleclick behavior
			onDoubleClick: (e: Event) => {
				instance.zoomAbs(0, 0, 1);
				instance.moveTo(0, 0);
			}
		});
	}

	onMount(() => {
		const sessionTables = sessionStorage.getItem('tables');
		tables.set(
			sessionTables
				? JSON.parse(sessionTables)
				: [
						{ id: 1, name: 'users', x: 50, y: 50 },
						{ id: 2, name: 'orders', x: 200, y: 100 }
					]
		);
		tables.subscribe((value) => {
			sessionStorage.setItem('tables', JSON.stringify(value));
		});
	});
</script>

<svg id="root-svg" viewBox="0 0 800 800">
	<g use:initPanzoom>
		{#each $tables as table}
			<g>
				<!-- Rectangle representing the table -->
				<rect x={table.x} y={table.y} width="100" height="50" fill="lightblue" />
				<!-- Text showing the table name -->
				<text x={table.x + 10} y={table.y + 25}>
					{table.id} - {table.name}
				</text>
			</g>
		{/each}
	</g>
</svg>
<button
	on:click={() => {
		$tables = [
			...$tables,
			{
				id: $tables.reduce((acc, value) => {
					return (acc = acc > value.id ? acc : value.id + 1);
				}, 0),
				name: 'new_table',
				x: Math.random() * 700,
				y: Math.random() * 750
			}
		];
	}}>Click</button
>

<style>
	svg {
		border: 1px solid black;
		width: 800px;
		height: 800px;
	}
</style>
