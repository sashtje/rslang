import React, { useEffect, useContext } from 'react';
import Footer from '../../components/UI/footer/Footer';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Material from "@amcharts/amcharts5/themes/Material";
import { AuthContext } from '../../context/index';

const Statistics = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const createChart = (id) => {
    let root = am5.Root.new(id);

    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Material.new(root)
    ]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX"
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);


    // Generate random data
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    var value = 100;

    function generateData() {
      value = Math.round((Math.random() * 10 - 5) + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateDatas(count) {
      var data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.5,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
      pan:"zoom"
    }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation:1,
      renderer: am5xy.AxisRendererY.new(root, {
      pan:"zoom"
    })
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2
    });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: am5.Circle.new(root, {
          radius: 4,
          stroke: root.interfaceColors.get("background"),
          strokeWidth: 2,
          fill: series.get("fill")
        })
      });
    });


    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));


    var data = generateDatas(50);
    series.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  };

  useEffect(() => {
    if (isAuth) {
      createChart("chart-new-words");
      createChart("chart-learned-words");
    }
  }, []);

  return (
    <div className='container-wrapper'>
      <main className='statistics main'>
        {
          isAuth
          ? <div className='container-inner statistics__container'>
            <section className='statistics__today stat-today'>
              <h2 className='stat-today__title'>Статистика за сегодня</h2>
              <div className='stat-today__words'>
                <div className='stat-today-mark'>
                  <div className='stat-today-mark__number'>0</div>
                  <div className='stat-today-mark__desc'>новых слов</div>
                </div>

                <div className='stat-today-mark'>
                  <div className='stat-today-mark__number'>0</div>
                  <div className='stat-today-mark__desc'>изученных слов</div>
                </div>

                <div className='stat-today-mark'>
                  <div className='stat-today-mark__number'>0</div>
                  <div className='stat-today-mark__desc'>% правильных ответов</div>
                </div>
              </div>

              <div className='stat-today__games'>
                <div className='stat-today-game'>
                  <h3 className='stat-today-game__name'>Саванна</h3>
                  <table className='stat-today-game__result'>
                    <tbody>
                      <tr className='stat-today-game__row'>
                        <td className='stat-today-game__title'>Количество новых слов:</td>
                        <td className='stat-today-game__number'>0</td>
                      </tr>
                      <tr className='stat-today-game__row'>
                        <td className='stat-today-game__title'>Процент правильных слов:</td>
                        <td className='stat-today-game__number'>0</td>
                      </tr>
                      <tr className='stat-today-game__row'>
                        <td className='stat-today-game__title'>Самая длительная серия правильных ответов:</td>
                        <td className='stat-today-game__number'>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='stat-today-game'>
                  <h3 className='stat-today-game__name'>Аудиовызов</h3>
                  <table className='stat-today-game__result'>
                    <tbody>
                      <tr className='stat-today-game__row'>
                        <td className='stat-today-game__title'>Количество новых слов:</td>
                        <td className='stat-today-game__number'>0</td>
                      </tr>
                      <tr className='stat-today-game__row'>
                        <td className='stat-today-game__title'>Процент правильных слов:</td>
                        <td className='stat-today-game__number'>0</td>
                      </tr>
                      <tr className='stat-today-game__row'>
                        <td className='stat-today-game__title'>Самая длительная серия правильных ответов:</td>
                        <td className='stat-today-game__number'>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className='statistics__all stat-all'>
              <h2 className='stat-all__title'>Статистика за всё время</h2>

              <section className='stat-all__new-words'>
                <h3 className='stat-all__subtitle'>Количество новых слов за каждый день</h3>
                <div className='stat-all__chart' id='chart-new-words'></div>
              </section>

              <section className='stat-all__learned-words'>
                <h3 className='stat-all__subtitle'>Увеличение количества изученных слов за весь период обучения</h3>
                <div className='stat-all__chart' id='chart-learned-words'></div>
              </section>
            </section>
          </div>
          : <div className='container-inner statistics__container statistics__container_is_disabled'>
              <div className='statistics__message'>Статистика доступна только для авторизованных пользователей</div>
            </div>
        }
      </main>
      <Footer />
    </div>
  );
};

export default Statistics;