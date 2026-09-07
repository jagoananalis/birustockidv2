import { useEffect, useMemo, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { FilterChips } from "@/components/filter-chips";

import { PageHero } from "@/components/page-hero";

import {

  getEconomicCalendar,

  IMPACT_LABEL,

  type CalendarImpact,

} from "@/lib/calendar";

import { cn } from "@/lib/utils";



export const Route = createFileRoute("/kalender-ekonomi")({

  component: KalenderPage,

  head: () => ({

    meta: [{ title: "Kalender Ekonomi | Birustock Indonesia" }],

  }),

});



const FILTERS = ["Semua", "Tinggi", "Sedang", "Rendah"] as const;



function getTodayKey() {

  return new Intl.DateTimeFormat("en-CA", {

    timeZone: "Asia/Jakarta",

    year: "numeric",

    month: "2-digit",

    day: "2-digit",

  }).format(new Date());

}



function shiftDate(dateKey: string, amount: number) {

  const date = new Date(`${dateKey}T12:00:00Z`);

  date.setUTCDate(date.getUTCDate() + amount);

  return date.toISOString().slice(0, 10);

}



function formatDateId(dateKey: string) {

  return new Intl.DateTimeFormat("id-ID", {

    timeZone: "Asia/Jakarta",

    weekday: "long",

    day: "numeric",

    month: "long",

    year: "numeric",

  }).format(new Date(`${dateKey}T12:00:00Z`));

}



function KalenderPage() {

  const today = getTodayKey();



  const [selectedDate, setSelectedDate] = useState(today);

  const [filter, setFilter] =

    useState<(typeof FILTERS)[number]>("Semua");



  const [payload, setPayload] = useState<Awaited<

    ReturnType<typeof getEconomicCalendar>

  > | null>(null);



  const [loading, setLoading] = useState(true);



  useEffect(() => {

    let active = true;



    setLoading(true);



    getEconomicCalendar({

      data: {

        date: selectedDate,

      },

    })

      .then((result) => {

        if (active) {

          setPayload(result);

        }

      })

      .catch((error) => {

        console.error("[calendar] load failed:", error);



        if (active) {

          setPayload(null);

        }

      })

      .finally(() => {

        if (active) {

          setLoading(false);

        }

      });



    return () => {

      active = false;

    };

  }, [selectedDate]);



  const items = useMemo(() => {

    const events = payload?.events ?? [];



    if (filter === "Semua") {

      return events;

    }



    const map: Record<string, CalendarImpact> = {

      Tinggi: "high",

      Sedang: "medium",

      Rendah: "low",

    };



    return events.filter(

      (event) => event.impact === map[filter],

    );

  }, [filter, payload]);



  const isToday = selectedDate === today;



  return (

    <>

      <PageHero

        eyebrow="Kalender Ekonomi"

        title="Jadwal Rilis Data Ekonomi"

        description="Pantau jadwal rilis data ekonomi penting yang berpotensi menggerakkan pasar forex, emas, dan kripto."

      />



      <section className="py-16 max-md:py-11">

        <div className="container-site">

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

            <div>

              <div className="text-sm text-subtle">

                Economic Calendar

              </div>



              <div className="text-xl font-bold capitalize">

                {formatDateId(selectedDate)}

              </div>



              <div className="mt-1 text-xs text-subtle">

                Semua waktu ditampilkan dalam WIB

              </div>

            </div>



            <span

              className={cn(

                "badge",

                payload?.source !== "fallback"

                  ? "badge-green"

                  : "badge-orange",

              )}

            >

              {payload?.source === "fallback"

                ? "Data tidak tersedia"

                : payload?.source === "cache"

                  ? "Live · Cache"

                  : "Live API"}

            </span>

          </div>



          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

            <div className="flex items-center gap-2">

              <button

                type="button"

                className="rounded-md border border-line px-4 py-2 text-sm font-medium hover:bg-surface-2"

                onClick={() =>

                  setSelectedDate(

                    shiftDate(selectedDate, -1),

                  )

                }

                disabled={loading}

              >

                ←

              </button>



              <button

                type="button"

                className={cn(

                  "rounded-md border px-4 py-2 text-sm font-medium",

                  isToday

                    ? "border-line bg-surface-2"

                    : "border-line hover:bg-surface-2",

                )}

                onClick={() => setSelectedDate(today)}

                disabled={loading}

              >

                Hari ini

              </button>



              <button

                type="button"

                className="rounded-md border border-line px-4 py-2 text-sm font-medium hover:bg-surface-2"

                onClick={() =>

                  setSelectedDate(

                    shiftDate(selectedDate, 1),

                  )

                }

                disabled={loading}

              >

                →

              </button>

            </div>



            <FilterChips

              options={[...FILTERS]}

              value={filter}

              onChange={(value) =>

                setFilter(

                  value as (typeof FILTERS)[number],

                )

              }

              label="Filter dampak"

            />

          </div>



          <div className="overflow-x-auto rounded-[16px] border border-line">

            <table className="cal-table">

              <thead>

                <tr>

                  {[

                    "Waktu",

                    "Negara",

                    "Event",

                    "Dampak",

                    "Actual",

                    "Forecast",

                    "Previous",

                  ].map((header) => (

                    <th key={header}>{header}</th>

                  ))}

                </tr>

              </thead>



              <tbody>

                {loading ? (

                  <tr>

                    <td

                      colSpan={7}

                      className="py-10 text-center text-subtle"

                    >

                      Memuat kalender ekonomi...

                    </td>

                  </tr>

                ) : items.length === 0 ? (

                  <tr>

                    <td

                      colSpan={7}

                      className="py-10 text-center text-subtle"

                    >

                      Tidak ada data ekonomi untuk tanggal ini.

                    </td>

                  </tr>

                ) : (

                  items.map((event, index) => (

                    <tr

                      key={`${event.economy}-${event.name}-${event.data}-${index}`}

                    >

                      <td className="font-mono text-[13px]">

                        {event.timeWib}

                      </td>



                      <td>

                        <span className="font-semibold">

                          {event.country}

                        </span>



                        <span className="ml-2 text-xs text-subtle">

                          {event.economy}

                        </span>

                      </td>



                      <td>{event.name}</td>



                      <td>

                        <span className="inline-flex items-center gap-1.5">

                          <span

                            className={cn(

                              "size-2 rounded-full",

                              event.impact === "high" &&

                                "bg-accent-red",

                              event.impact === "medium" &&

                                "bg-accent-orange",

                              event.impact === "low" &&

                                "bg-accent-green",

                            )}

                            aria-hidden="true"

                          />



                          {IMPACT_LABEL[event.impact]}

                        </span>

                      </td>



                      <td className="tabular-nums">

                        {event.actual}

                      </td>



                      <td className="tabular-nums">

                        {event.forecast}

                      </td>



                      <td className="tabular-nums">

                        {event.previous}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>



          <p className="mt-4 text-[13.5px] text-subtle">

            Sumber: Forex Factory. Data kalender diproses di

            server Birustock dan waktu ditampilkan dalam WIB.

          </p>

        </div>

      </section>

    </>

  );

}
