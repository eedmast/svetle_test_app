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
        min-width: 20rem;
        background-color: #0088cc;
        color: white;
        text-align:center;
        border-radius: 7px;
        padding: .7rem;

        background-image: linear-gradient(
                to right,
                rgba(20, 156, 254, 0.8),
                rgba(0, 136, 204, 0.8));
        box-shadow: 0 .5rem 1.2rem rgba(0,0,0, .4);

    }
</style>

<div class="dialog" on:mousedown|stopPropagation>
  <slot name = header></slot>
  <slot></slot>
  <slot name = footer>
    <button on:click|stopPropagation={close}>Close</button>
  </slot>
</div>