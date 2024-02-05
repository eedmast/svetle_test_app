<script>
    import {onMount, createEventDispatcher, onDestroy} from "svelte";

    let token = '';
    let dispatch = createEventDispatcher();

    $: isTokenValid = token.trim().length > 0;

    onMount( () => {
        dispatch('tokenShow', true);
    })

    onDestroy(() => {
        dispatch('tokenShow', false);
    })

    function handlePasteClick() {
    }

    function validateToken() {
        dispatch('validateToken', token);
    }

</script>

<style>
    h2 { max-width: 80vw}
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

    textarea {
        box-sizing: border-box;
        resize: none;
        border: 0;
        border-color: #0088cc;
        user-select: none;
        outline: 0;
    }

</style>

<div class="header-style">
  <h2>Input your token to validate account</h2>
  <img src="paste_icon.png" alt="" on:click={handlePasteClick}/>
</div>
<textarea name="token" id="" cols="40" rows="10" bind:value={token}></textarea>
<div>
  <button disabled = {!isTokenValid} on:click|stopPropagation={validateToken}>Validate</button>
</div>
