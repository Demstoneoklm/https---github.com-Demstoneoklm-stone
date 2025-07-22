<template>
  <div>
    <canvas ref="canvas" width="400" height="200" style="border: 1px solid black;"></canvas>
    <div>
      <button @click="clear">Effacer</button>
      <button @click="save">Enregistrer</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SignaturePad from 'signature_pad';

const canvas = ref<HTMLCanvasElement | null>(null);
let signaturePad: SignaturePad | null = null;

onMounted(() => {
  if (canvas.value) {
    signaturePad = new SignaturePad(canvas.value);
  }
});

const clear = () => {
  if (signaturePad) {
    signaturePad.clear();
  }
};

const save = async () => {
  if (signaturePad && !signaturePad.isEmpty()) {
    const signatureData = signaturePad.toDataURL();
    // Envoyer les données au backend
    console.log(signatureData);
    // Ici vous devrez ajouter l'appel API vers votre backend
  } else {
    alert('Veuillez fournir une signature');
  }
};
</script>