<template>
  <main class="main">
    <div
      class="main-info"
      :class="
        typeof weatherData.main != 'undefined' &&
        (weatherData.main.temp > 16 && weatherData.main.temp < 22
          ? 'warm'
          : weatherData.main.temp >= 22
          ? 'clean'
          : '')
      "
    >
      <i @click="openAside" class="main-info__burger">
        <span v-for="item in 3" :key="item"></span>
      </i>
      <h1 class="main-info__degree">
        {{ Math.round(weatherData?.main?.temp) }}
      </h1>
      <div class="main-info__card">
        <h3 class="main-info__card-title">{{ weatherData?.name }}</h3>
        <span class="main-info__card-subtitle">
          {{ hh < 10 ? `0${hh}` : hh }}:{{ mm < 10 ? `0${mm}` : mm }} -
          {{ week }}, {{ day }} {{ month }} {{ year }}
        </span>
      </div>

      <div class="main-info__card">
        <figure
          class="main-info__card-icon"
          v-if="weatherData.weather && weatherData.weather.length"
        >
          <img
            :src="`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@4x.png`"
            alt=""
          />
          <figcaption class="main-info__card-subtitle">
            {{ weatherData?.weather[0]?.description }}
          </figcaption>
        </figure>
      </div>
    </div>

    <Dashboard
      @on-submit="onSubnit"
      @close-aside="closeAside"
      v-bind="{
        isShowAside: isShowAside,
        weatherDetails: [
          {
            text: 'cloudy',
            protsent: weatherData?.clouds?.all,
          },
          {
            text: 'humidity',
            protsent: weatherData?.main?.humidity,
          },
          {
            text: 'wind',
            protsent: Math.floor(weatherData?.wind?.speed),
          },
          {
            text: 'rain',
            protsent: Math.floor(weatherData?.main?.feels_like),
          },
        ],
      }"
    />
  </main>
</template>

<script>
import Dashboard from "@/components/Dashboard.vue";
import { mapState } from "vuex";
export default {
  components: { Dashboard },
  data() {
    return {
      isShowAside: false,
      query: "Tashkent",
      hh: "",
      mm: "",
      week: "",
      day: "",
      month: "",
      year: "",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
  },
  computed: {
    ...mapState({
      weatherData: (state) => state.weather,
    }),
  },

  mounted() {
    this.$store.dispatch("fetchWeather", { query: this.query });
    const date = new Date();
    this.hh = date.getHours();
    this.mm = date.getMinutes();
    this.day = date.getDate();
    this.week = this.days[date.getDay()];
    this.month = this.months[date.getMonth()].slice(0, 3);
    this.year = date.getFullYear();
  },

  methods: {
    onSubnit(data) {
      console.log("data keldi", data);
      this.query = data;
      this.$store.dispatch("fetchWeather", { query: this.query });
    },
    openAside() {
      this.isShowAside = true;
    },
    closeAside() {
      this.isShowAside = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  padding: 100px 6%;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    display: block;
  }

  // main-info
  &-info {
    padding: 48px;
    box-shadow: 0 2px 15px 0px #999;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    background: url("@/static/cold.jpg");
    position: relative;
    &__burger {
      display: none;
    }
    @media screen and (max-width: 1024px) {
      &__burger {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 36px;
        height: 36px;
        padding: 6px;
        border-radius: 50%;
        position: absolute;
        z-index: 999;
        top: 12px;
        left: 12px;
        span {
          width: 100%;
          height: 1px;
          background-color: #fff;
        }
      }
    }
    @media screen and (max-width: 630px) {
      flex-direction: column;
      align-items: flex-start;
    }
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba($color: #000000, $alpha: 0.4);
      z-index: 1;
    }
    &.warm {
      background: url("@/static/warm.jpg");
    }
    &.clean {
      background: url("@/static/clean.jpg");
    }
    // main-info__degree
    &__degree {
      color: #fff;
      font-size: 8rem;
      position: relative;
      z-index: 2;
      &::after {
        content: "";
        width: 12px;
        height: 12px;
        border: 5px solid #fff;
        border-radius: 50%;
        position: absolute;
      }
    }

    // main-info__card
    &__card {
      position: relative;
      z-index: 2;
      display: inline-flex;
      flex-direction: column;
      gap: 4px;

      // main-info__card-title
      &-title {
        color: #fff;
        font-size: 3rem;
        font-weight: 600;
      }

      // main-info__card-subtitle
      &-subtitle {
        color: #fff;
        font-size: 1.5rem;
        font-weight: 500;
      }

      // main-info__card-subtitle
      &-icon {
        text-align: center;
      }
    }
  }
}
</style>