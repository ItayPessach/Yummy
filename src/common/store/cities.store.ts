import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { config } from '@/config';

const LOCATION_NAME_FIELD =  'שם_ישוב_לועזי';

class CitiesStore {
  cities: string[] = [];
  isDataLoaded = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchCities() {
    try {
      const res = await axios.get(config.citiesApiUrl);
      runInAction(() => {
        // Use set constructor and destruct afterwards in order to remove duplicates
        this.cities = [
          ...new Set(
            res.data?.result?.records
              .map((city: any) => city[LOCATION_NAME_FIELD].trim())
              .filter(Boolean)
          ),
        ] as string[];
        this.isDataLoaded = true;
      });
    } catch (err) {
      // TODO: give the user a message that the data is not available instead of logging to console
      console.log(err);
    }
  }
}

export default new CitiesStore();
