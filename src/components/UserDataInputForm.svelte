<script>
    import InputBox from "./InputBox.svelte";
    import { createEventDispatcher } from 'svelte';

    export let telegramId = "";
    export let password = "";

    let dispatch = createEventDispatcher();

    function handleTelegramIdInput(event) {
        //TODO
        telegramId = event.target.value.replace(/\D/g,'');
        event.target.value = telegramId;
    }

    function handleInputUpdate(event) {

    }

</script>

<InputBox
    id="telegramId"
    label="Telegram ID"
    value={telegramId}
    type="text"
    on:input={(e)=> {telegramId = e.target.value; }}
/>

<InputBox
    id="password"
    label="Password"
    value={password}
    type="password"
    on:input={(e)=> {password = e.target.value}}
/>
