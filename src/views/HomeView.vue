<script setup lang="ts">
import { usePairs } from '@/modules/usePairs'

const { selectedPair } = usePairs()
</script>

<template>
  <div class="mt-16 pt-4">
    <v-sheet elevation="0" class="mt-4 mt-sm-8">
      <div class="d-flex justify-center pt-4 pt-sm-16 position-relative">
        <div class="bg-grey-lighten-4 rounded-circle pa-8 pa-sm-12 d-flex justify-center">
          <v-icon size="144" class="text-grey-darken-1">mdi-beer-outline</v-icon>
        </div>
      </div>
      <div class="text-h6 text-grey-darken-1 text-center pt-4 mb-2 mb-sm-16">
        {{ selectedPair }}
      </div>
      <v-container class="">
        <v-row no-gutters class="">
          <v-col class="align-self-stretch">
            <v-sheet class="pa-2 pa-sm-8 ma-2 bg-grey-lighten-4">
              <v-sheet class="px-2 pb-1 d-flex align-center justify-center bg-transparent"
                >Bid Ask table</v-sheet
              >
              <v-btn
                variant="elevated"
                elevation="1"
                prepend-icon="mdi-format-columns"
                size="large"
                block
                to="/order-book"
              >
                Order Book
              </v-btn>
            </v-sheet>
          </v-col>
          <v-col class="align-self-stretch">
            <v-sheet class="pa-2 pa-sm-8 ma-2 bg-grey-lighten-4">
              <v-sheet class="px-2 pb-1 d-flex align-center justify-center bg-transparent"
                >View and change Pair</v-sheet
              >
              <v-btn
                variant="elevated"
                elevation="1"
                prepend-icon="mdi-cog-outline"
                size="large"
                block
                to="/settings"
              >
                Settings
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>
