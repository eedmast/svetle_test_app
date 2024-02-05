<script>
    import { createEventDispatcher } from 'svelte'
    import UserDataInputForm from "./UserDataInputForm.svelte";
    import TokenBox from "./TokenBox.svelte";
    import ValidateTokenBox from "./ValidateTokenBox.svelte";
    import DialogBase from "./DialogBase.svelte";
    import {APP_STATES} from "../utils/utils";

    export let state;
    export let token = '';

    let labelText = "";
    let telegramId = "";
    let password = "";
    let dispatch = createEventDispatcher();

    $:isTelegramIdValid = isValidTelegramId(telegramId);
    $:isPasswordValid = password.trim().length > 0;
    $:isFormValid = isTelegramIdValid && isPasswordValid

    $: isTokenBox = state === APP_STATES.SHOW_TOKEN || state === APP_STATES.VALIDATE;
    $: labelText = isTokenBox ? '' : state === APP_STATES.SIGNUP ? 'Sign up' : 'Log in';


    export function isValidTelegramId(value) {
        const pattern = "^[0-9]*$"
        let isValid = new RegExp(pattern).test(value.trim());
        isValid &&= value.trim().length > 0;
        return isValid;
    }

    function handleSubmit(e) {
        const eventName = state === APP_STATES.SIGNUP ? 'signupRequest' : 'loginRequest';
        const data = {
            telegramId: telegramId,
            password: password
        };
        dispatch(eventName, data);
    }

    function closeTokenBox() {
        dispatch('closeTokenBox');
    }

    function validateToken(event) {
        dispatch('validateToken', event.detail);
    }

</script>
<style>
    form {
        display: inline-block;
    }
</style>

<DialogBase>
  <div slot="header"><h1>{labelText}</h1></div>
  {#if state === APP_STATES.SHOW_TOKEN}
    <TokenBox token={token} on:closeTokenBox={closeTokenBox}/>
  {:else if state === APP_STATES.VALIDATE}
    <ValidateTokenBox on:validateToken={validateToken}/>
  {:else }
  <form on:submit|preventDefault = { handleSubmit }>
      <UserDataInputForm
          bind:telegramId={telegramId}
          bind:password={password}
      />
    <button type='submit' disabled = {!isFormValid}>{labelText}</button>
  </form>
  {/if}
  <div slot="footer"/>
</DialogBase>