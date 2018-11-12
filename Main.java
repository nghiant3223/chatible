import java.util.*;

// Object
class Displayer {
    String color;
    List data[];

    public void update() {
        
    }
}

// Subject
class DataProvider {
    List<Displayer> displayers;
    List<Float> data;

    DataProvider(DataCollector windDataCollector) {
        displayers = new ArrayList<Displayer>();
        data = new ArrayList<Float>();
    }

    public void updateDataProvider(float data) {
        this.data.add(data);
    }

    public void notifyDisplayer() {
        for (Displayer displayer : this.displayers)  {
            displayer.update();
        }
    }
}

abstract class DataCollector {
    public abstract float getData();
    public abstract void sendData();
    public abstract void updateDataProvider();
}

class WindDataCollector implements DataCollecter {
    DataProvider dataProvider;
    float windSpeed;

    WindDataCollector(DataProvider dataProvider) {
        this.dataProvider = dataProvider;
    }

    public float getData() {
        return this.windSpeed;
    }

    public void collectData() {
        this.windSpeed = 100;
    }

    public void notifyDataProvider() {
        this.dataProvider.updateDataProvider(this.windSpeed);
    }
}

class TemperatureDataCollector implements DataCollecter {
    DataProvider dataProvider;
    float temperature;

    TemperatureDataCollector(DataProvider dataProvider) {
        this.dataProvider = dataProvider;
    }

    public float getData() {
        return this.temperature;
    }

    public void collectData() {
        this.temperature = 100;
    }

    public void notifyDataProvider() {
        this.dataProvider.updateDataProvider(this.temperature);
    }
}

class HumidityDataCollector implements DataCollecter {
    DataProvider dataProvider;
    float humidity;

    HumidityDataCollector(DataProvider dataProvider) {
        this.dataProvider = dataProvider;
    }

    public float getData() {
        return this.humidity;
    }

    public void collectData() {
        this.humidity = 100;
    }

    public void notifyDataProvider() {
        this.dataProvider.updateDataProvider(this.humidity);
    }
}