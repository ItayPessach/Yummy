import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class CitiesStore {
  cities: string[] = [];
  isDataLoaded = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchCities() {
    try {
      // TODO: consider using an env variable for the url, and maybe create a config file for the app
      const res = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab"
      );
      runInAction(() => {
        // Use set constructor and destruct afterwards in order to remove duplicates
        this.cities = [
          ...new Set(
            res.data?.result?.records
              .map((city: any) => city["שם_ישוב_לועזי"].trim())
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
