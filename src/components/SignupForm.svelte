<script>
    import { createEventDispatcher } from 'svelte'
    import UserDataInputForm from "./UserDataInputForm.svelte";
    import TokenBox from "./TokenBox.svelte";
    import DialogBox from "./DialogBox.svelte";

    export let action = '';
    export let token = '';
    export let showToken;

    let labelText = "";

    let telegramId = "237642";
    let password = "password";
    let loginToken = "";

    let dispatch = createEventDispatcher();

    $:isTelegramIdValid = isValidTelegramId(telegramId);
    $:isPasswordValid = password.trim().length > 0;
    $:isTokenValid = (loginToken.trim().length > 0 || !isLoginForm);
    $:isFormValid = isTelegramIdValid && isPasswordValid && isTokenValid

    $: labelText = action === 'signup' ? 'Sign up' : 'Log in';
    $: isLoginForm = action !== 'signup';

    export function isValidTelegramId(value) {

        const pattern = "^[0-9]*$"
        let isValid =  new RegExp(pattern).test(value.trim());
        isValid &&= value.trim().length;
        return isValid;
    }

    function handleSubmit(e) {
        if (action === 'signup') {
            dispatch('signupRequest', {
                telegramId: telegramId,
                password: password
            })
        } else {
            dispatch('loginRequest', {
                telegramId: telegramId,
                password: password,
                token: loginToken
            })
        }
    }

    function closeTokenBox() {
        showToken = false;
    }

</script>
<style>
    form {
        display: inline-block;
    }
</style>

<DialogBox>
  <div slot="header"><h1 hidden={showToken}>{labelText}</h1></div>
  {#if showToken }
    <TokenBox token={token} on:tokenShow on:closeTokenBox={closeTokenBox}/>
  {:else }
  <form on:submit|preventDefault = { handleSubmit }>
      <UserDataInputForm
              isLoginForm={isLoginForm}
              bind:telegramId={telegramId}
              bind:password={password}
              bind:token={loginToken}/>
    <button type='submit' disabled = {!isFormValid}>{labelText}</button>
  </form>
  {/if}

</DialogBox>

{#if token.trim().length > 0}

{/if}