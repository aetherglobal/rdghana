"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL = "/data/countries-110m.json";

const HONG_KONG: [number, number] = [114.17, 22.32];
const SHENZHEN: [number, number] = [114.06, 22.54];

const GEO_STYLE = {
	default: { outline: "none" as const },
	hover: { outline: "none" as const },
	pressed: { outline: "none" as const },
};

export function ContactMap(): React.ReactElement {
	return (
		<ComposableMap
			projection="geoMercator"
			projectionConfig={{ center: [107, 16], scale: 1500 }}
			width={1440}
			height={700}
			className="h-full w-full"
			style={{ width: "100%", height: "100%" }}
		>
			<Geographies geography={GEO_URL}>
				{({ geographies }) =>
					geographies.map((geo) => (
						<Geography
							key={geo.rsmKey}
							geography={geo}
							fill="#dee3ee"
							stroke="#eef1f7"
							strokeWidth={0.6}
							style={GEO_STYLE}
						/>
					))
				}
			</Geographies>
			<Marker coordinates={SHENZHEN}>
				<circle r={9} fill="#8b7cf0">
					<animate attributeName="r" values="9;32" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
					<animate attributeName="opacity" values="0.4;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
				</circle>
				<circle r={9} fill="#8b7cf0" fillOpacity={0.7} />
			</Marker>
			<Marker coordinates={HONG_KONG}>
				<circle r={9} fill="#6c29ed">
					<animate attributeName="r" values="9;32" dur="2.4s" begin="0s" repeatCount="indefinite" />
					<animate attributeName="opacity" values="0.45;0" dur="2.4s" begin="0s" repeatCount="indefinite" />
				</circle>
				<circle r={9} fill="#6c29ed" fillOpacity={0.9} />
			</Marker>
		</ComposableMap>
	);
}
