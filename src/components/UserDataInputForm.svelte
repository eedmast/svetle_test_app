<script>
    import InputBox from "./InputBox.svelte";

    export let telegramId = "";
    export let password = "";

    function handleTelegramIdInput(event) {
        telegramId = event.target.value.replace(/\D/g,'');
        event.target.value = telegramId;
    }

</script>

<InputBox
    id="telegramId"
    label="Telegram ID"
    value={telegramId}
    type="text"
    on:input={handleTelegramIdInput}
/>

<InputBox
    id="password"
    label="Password"
    value={password}
    type="password"
    on:input={(e)=> {password = e.target.value}}
/>
