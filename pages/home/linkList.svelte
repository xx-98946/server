<script lang="ts">
	import Tabs from "../common/tabs.svelte";
	import Modal from "../common/modal.svelte";
	import type { ILinkItem } from "../../types/linkList";
	import LinkItem from "./linkItem.svelte";

	interface Props {
		list: ILinkItem[];
	}
	let { list } = $props<Props>();
	let activeTab = $state("计算机");

	const CategoryList = [
		"计算机",
		"博客",
		"视频",
		"其他",
		"学习",
		"办公",
		"政府",
	];

	let computedList = $derived(
		list.filter((item) => item.category.includes(activeTab)),
	);

	let modal: Modal;

	let item: ILinkItem = $state({
		link: "",
		icon: "",
		title: "",
		category: "计算机",
	});
	async function appendLinkItem() {
		const res = await fetch("/api/linkList", {
			method: "POST",
			body: JSON.stringify(item),
		});
		const message = await res.text();
		console.log(message);
		modal.close();
		location.reload();
	}
</script>

<Tabs
	list={CategoryList}
	style="margin-bottom: 0.5em;margin-left: 1em;"
	bind:activeTab
/>
<div class="link-list">
	{#each computedList as item (item.link)}
		<LinkItem {item} />
	{/each}

	<div>
		<button class="append-btn" onclick={() => modal.open()}> + </button>
	</div>
</div>

<Modal bind:this={modal}>
	<h2 style="font-size: 1.5em;">添加链接</h2>

	<div class="form">
		<label class="form-item">链接 <input bind:value={item.link} /></label>
		<label class="form-item">图标 <input bind:value={item.icon} /></label>
		<label class="form-item">标题 <input bind:value={item.title} /></label>
		<label class="form-item"
			>分类 <input bind:value={item.category} /></label
		>
		<button onclick={appendLinkItem}>确定</button>
	</div>
</Modal>

<style>
	.link-list {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1em;
		border: 1px solid #999;
		padding: 1em;
	}

	@media (max-width: 1200px) {
		.link-list {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (max-width: 900px) {
		.link-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 600px) {
		.link-list {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 300px) {
		.link-list {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	.append-btn {
		border: 1px solid #666;
		border-radius: 100%;
		width: 2em;
		height: 2em;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: aliceblue;
		background-color: purple;
		cursor: pointer;
	}

	.form {
		display: flex;
		flex-wrap: wrap;
	}

	.form-item {
		display: flex;
		flex: 0 0 100%;
		padding: 1em;
	}

	input {
		border: 1px solid gray;
		flex: 1 1 auto;
		margin-left: 1em;
	}
</style>
