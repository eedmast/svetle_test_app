<script>
    import {onMount, onDestroy} from 'svelte';
    import userStore from './user_store'
    import {APP_STATES, formatCurrentTime, generateToken} from "./utils/utils";
    import {fetchUserData, sendCreateUserRequest, sendDeleteUserRequest} from "./utils/serverUtils";
    import UserDialog from "./components/UserDialog.svelte";
    import Profile from "./components/Profile.svelte";

    let appState = null;

   // let dialogType = 'signup';
    let userData;
    //TODO: implement error handling
    let errorMessage;

    // $: dialogType = userCreated ? 'login' : 'signup'
    // $: menuButtonCaption = userCreated ? (userLoggedIn ? 'Profile' : 'Login') : 'Signup'
    $: menuCaption = appState === APP_STATES.IDLE ? 'Profile': '';
    $: console.warn(`APP STATE: ${appState}`);

    onMount( ()=> {
        fetchUserData().then(
            (result) => {
                userStore.set(result);
                // dataInitComplete = true;
                appState = appState || (result ? APP_STATES.LOGIN : APP_STATES.SIGNUP)
                console.warn(`After onMount appState = ${appState}`);
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
        // userCreated = !!data?.id;
    });

    function showDialog(event) {
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
        console.warn(`Validating: `);
        console.warn(event);
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
            console.warn(`User deleted.`);
            console.warn(result);
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
        background-color: #0088cc;
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

<!--<main on:mousedown={ () => isDialogOpen = false || toShowToken}>-->
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