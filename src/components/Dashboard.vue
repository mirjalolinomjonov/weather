<template>
  <aside class="aside" :class="{ 'is-active': isShowAside }">
    <i @click="onSubmit" class="aside__search fas fa-search"></i>
    <i @click="closeAside" class="aside__arrow fas fa-arrow-left"></i>
    <ul class="list">
      <form @submit.prevent="onSubmit" class="search">
        <input
          v-model="query"
          type="text"
          class="search__input"
          placeholder="Another location"
        />
        <!-- queries list -->
        <label
          class="search-query"
          :for="item"
          v-for="item in regions"
          :key="item"
          @click="closeAside"
        >
          {{ item }}
          <input
            class="search-query__input"
            type="radio"
            name="region"
            :id="item"
            v-model="query"
            :value="item"
            @change="onSubmit"
          />
        </label>
      </form>
    </ul>

    <!-- status list -->
    <ul class="list">
      <h2 class="list__title">Weather details</h2>
      <li
        class="list__item"
        v-for="(item, index) in weatherDetails"
        :key="index"
      >
        <span>{{ item.text }}</span>
        <span>
          {{ item.protsent
          }}{{ item.text == "wind" ? "/h" : item.text == "rain" ? "mm" : "%" }}
        </span>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  emits: ["submit"],
  props: {
    weatherDetails: Array,
    isShowAside: Boolean,
  },
  data() {
    return {
      query: "",
    };
  },

  computed: {
    ...mapState({
      regions: (state) => state.regions,
    }),
  },

  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.query);
    },
    closeAside() {
      this.$emit("closeAside");
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  position: relative;
  padding: 0 24px 24px;
  background: linear-gradient(to bottom, #155e75, #3b82f6);
  transition: all 0.8s ease-in-out;
  @media screen and (max-width: 1024px) {
    position: absolute;
    top: 50%;
    right: -150%;
    transform: translateY(-50%);
    z-index: 999;
    // max-height: 80vh;
    &__arrow{
      display: inline-block !important;
    }
    &.is-active {
      right: 0 !important;
    }
  }
  // aside arrow
  &__arrow {
    position: absolute;
    left: -32px;
    top: 0;
    font-size: 1.5rem;
    transform: rotate(180deg);
    background-color: #155e75;
    color: #fff;
    padding: 8px;
    display: none;
  }
  // search icon
  &__search {
    width: 48px;
    height: 48px;
    padding: 12px;
    background-color: #bae6fd;
    position: absolute;
    top: 0;
    right: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  // list
  .list {
    border-bottom: 1px solid #fff;
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;

    // search
    .search {
      width: 80%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      &-query {
        color: #fff;
        font-size: 1rem;
        text-transform: capitalize;
        opacity: 0.5;
        transition: opacity 0.25s ease-in-out;
        padding: 4px 0;
        position: relative;
        cursor: pointer;
        &:hover {
          opacity: 1;
        }

        &__input {
          position: absolute;
          left: -15px;
          display: none;
        }
      }

      &__input {
        width: 100%;
        border: none;
        border-bottom: 1px solid #fff;
        background: transparent;
        padding-bottom: 8px;
        outline: none;
        color: #fff;
        font-size: 1rem;
        &::placeholder {
          color: #fff;
          opacity: 0.5;
        }
      }
    }

    // list__title
    &__title {
      color: #fff;
      font-size: 1rem;
    }

    &__item {
      font-size: 1rem;
      color: #fff;
      font-weight: 500;
      text-transform: capitalize;
      opacity: 0.5;
      padding: 4px 0;
      transition: opacity 0.25s ease-in-out;
      &:hover {
        opacity: 1;
      }
      &:not(:first-child) {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      span:last-child {
        opacity: 1;
        font-weight: 600;
      }
    }
  }
  // aside__devider
  &__devider {
    width: 100%;
    height: 1px;
    background: #fff;
  }
}
</style>