<script>
    import {onMount, createEventDispatcher, onDestroy} from "svelte";

    export let token;

    let dispatch = createEventDispatcher();

    onMount( () => {
        dispatch('tokenShow', true);
    })

    onDestroy(() => {
        dispatch('tokenShow', false);
    })

    function handleCopyClick() {
        console.warn(`Copy to clipboard not implemented`);
    }

    function closeTokenBox() {
        console.warn(`TOKEN_BOX: close button clicked.`);
        dispatch('closeTokenBox');
    }

</script>

<style>
    .token-box {
        /*display: inline-block;*/
        width: 36rem;
        color: white;
        word-break: break-all;
        border-radius: 6px;
        border: solid #ccc;
        border-width: 1px;
        box-sizing: border-box;

        margin-top: 1rem;
        margin-bottom: 1rem;
        padding: 1.6rem;
    }
    img {
        cursor: pointer;
        height: 1.6rem;
        user-select: none;
    }

    .header-style {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: baseline;
        gap: 1rem;
    }

</style>
<div class="header-style">
  <h2>Save this token!!!</h2>
  <img src="copy_icon.png" alt="" on:click={handleCopyClick}/>
</div>
<div class="token-box">{token}</div>
<button on:click|stopPropagation={closeTokenBox}>Close</button>