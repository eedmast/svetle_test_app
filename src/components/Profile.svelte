<script>
  export let userData;
</script>

<style>
  .profile-style {
      position: relative;
      display: inline-block;
      top: 12rem;
      min-width: 20rem;
      text-align:center;
      border-radius: 7px;
      padding: .7rem;

      color: #000;
  }
</style>

<div class="profile-style">
  <h3>{userData.telegramId}</h3>
  <h3>***************</h3>
  <h3>Created: {userData.createdAt}</h3>
</div>