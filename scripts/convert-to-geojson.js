#!/usr/bin/env node

import fs from "fs";
import * as turf from '@turf/helpers';
import * as R from 'ramda';

const locations = JSON.parse(fs.readFileSync('/dev/stdin').toString())

if (!Array.isArray(locations.points)) {
	throw new Error("Expected file to be an object with a 'points' array");
}

const features = locations.points.map((obj) => {
	const { lon, lat } = obj.geo_location

	return turf.feature(turf.point([lon, lat]), obj, {
		id: obj.location_code
	})
})

const featureCollection = turf.featureCollection(R.sortBy(R.prop('id'), features))
console.log(JSON.stringify(featureCollection, null, 2));
