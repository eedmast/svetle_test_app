<script>
    import {onMount, onDestroy} from 'svelte';
    import userStore from './user_store'
    import {APP_STATES, formatCurrentTime, generateToken} from "./utils/utils";
    import {fetchUserData, sendCreateUserRequest, sendDeleteUserRequest} from "./utils/serverUtils";
    import UserDialog from "./components/UserDialog.svelte";
    import Profile from "./components/Profile.svelte";

    let appState = null;
    let userData;
    //TODO: implement error handling
    let errorMessage;

    $: menuCaption = appState === APP_STATES.IDLE ? 'Profile': '';
    $: console.warn(`APP STATE: ${appState}`);

    onMount( ()=> {
        fetchUserData().then(
            (result) => {
                userStore.set(result);
                appState = appState || (result ? APP_STATES.LOGIN : APP_STATES.SIGNUP)
            },
            (error) => {
                errorMessage = error.message;
            });
    })

    const unsub = userStore.subscribe( data => {
        userData = {
            id: data?.id,
            telegramId: data?.telegramId,
            password: data?.password,
            token: data?.token,
            createdAt: data?.createdAt
        }
    });

    function showDialog() {
        if (appState === APP_STATES.IDLE) appState = APP_STATES.LOGIN
    }

    function handleUserSignup(event) {
        const newUserData = {
            id: 1,
            telegramId: event.detail.telegramId,
            password: event.detail.password,
            token: generateToken(),
            createdAt: formatCurrentTime()
        }

        sendCreateUserRequest(newUserData).then(
            (result) => {
                userStore.set(result);
                appState = APP_STATES.SHOW_TOKEN
            },
            (error) => {
                errorMessage = error;
            }
        );
    }

    function handleUserLogin(event) {
        fetchUserData();
        if (checkLogin(event.detail)) {
            appState = APP_STATES.VALIDATE
        } else {

        }

    }

    function checkLogin(loginData) {
        //TODO: provide user more information in case of wrong credentials
        let isDataValid = true;
        for (const [key, value] of Object.entries(loginData)) {
            console.log(`${key}: ${value}`);
            if(value !== userData[key]) {
                isDataValid = false;
            }
        }
        return isDataValid;
    }

    function handleTokenClose(e) {
        appState = APP_STATES.IDLE;
    }

    function handleValidateToken(event) {
        if(event.detail === userData.token) {
            errorMessage = '';
            appState = APP_STATES.SHOW_PROFILE;
        } else {
            handleUserDelete();
        }
    }

    function handleUserDelete() {
        appState = APP_STATES.IDLE;
        sendDeleteUserRequest().then( (result) => {
            userData = result;
            appState = APP_STATES.SIGNUP;
        })
        errorMessage = 'Validation failed'
    }

  onDestroy(() => {
      if(unsub) {
          unsub();
      }
  })

</script>

<style>
    .header-style {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 5rem;
        padding-left: 2rem;
        background-image: linear-gradient(
                to right,
                rgba(20, 156, 254, 0.8),
                rgba(0, 136, 204, 0.8));
        padding-top: 0;
        padding-bottom: 0;
        text-align: left;
    }
    .header-text {
      position: absolute;
      margin-top: 0.9rem;
      cursor: pointer;
      user-select: none;
    }

    main {
        width: 100vw;
        height: 100vh;
        text-align: center;
    }

    .temp {
        position: absolute;
        color: black;
        top: 10rem;
        left: 1rem;
    }

</style>

<main>
  <header class="header-style">
    <a class="header-text" on:click|stopPropagation={showDialog} >{menuCaption}</a>
  </header>

  {#if appState !== APP_STATES.IDLE && appState !== APP_STATES.SHOW_PROFILE}
    <UserDialog state = {appState} token={userData.token}
                on:signupRequest={handleUserSignup}
                on:loginRequest={handleUserLogin}
                on:validateToken={handleValidateToken}
                on:closeTokenBox={handleTokenClose}
    />
  {:else if appState === APP_STATES.SHOW_PROFILE}
    <Profile userData={userData}/>
  {/if}
</main>