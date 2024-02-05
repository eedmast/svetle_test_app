<script>
  import {createEventDispatcher} from "svelte";

  let dispatch = createEventDispatcher();

  function close() {
      dispatch('close');
  }

</script>

<style>
    .dialog {
        position: relative;
        display: inline-block;
        top: 12rem;
        /*left: 25%;*/
        /*width: 60%;*/
        min-width: 20rem;
        background-color: #0088cc;
        color: white;
        text-align:center;
        border-radius: 7px;
        padding: .7rem;
    }
</style>

<div class="dialog" on:mousedown|stopPropagation>
  <slot name = header></slot>
  <slot></slot>
  <slot name = footer>
    <button on:click|stopPropagation={close}>Close</button>
  </slot>
</div>