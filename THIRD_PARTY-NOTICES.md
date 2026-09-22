# Third-party notices — AstroPlanner v0.11.5

AstroPlanner application code is licensed separately under the repository's `LICENSE`. The astronomical catalog data listed below remains subject to its own upstream licence and attribution terms.

## HYG star database v4.1

- Dataset: HYG v4.1
- Author / maintainer: David Nash / Astronexus
- Source: https://github.com/astronexus/HYG-Database
- Current upstream: https://codeberg.org/astronexus/hyg
- License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- License text: https://creativecommons.org/licenses/by-sa/4.0/

AstroPlanner uses stellar positions and apparent magnitudes for the technical framing map. The application fetches a compact binary representation prepared by `bryancurran/celestial-cartography`:

https://github.com/bryancurran/celestial-cartography

The HYG-derived star data remains subject to CC BY-SA 4.0.

## Deep-sky catalogue layers

AstroPlanner fetches pinned, preprocessed catalogue files from the `acocalypso/celestia_atlas` data set and keeps them in a separate browser cache. The DSO renderer in AstroPlanner does not create a second catalogue; it renders the same records used by the Planner search catalogue.

Pinned data source:

https://github.com/acocalypso/celestia_atlas

### OpenNGC-derived layer

- Upstream project: OpenNGC by Mattia Verga
- Source: https://github.com/mattiaverga/OpenNGC
- License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- AstroPlanner uses catalogue positions, object types and, when available in the prepared record, catalogue major/minor axes and position angle.

### Stellarium-derived DSO supplement

- Upstream project: Stellarium
- Source: https://github.com/Stellarium/stellarium
- Licence boundary of the pinned Celestia Atlas supplement: GPL-2.0-or-later
- The supplement remains separately licensed catalogue material; AstroPlanner application code is not relicensed by this notice.

### SIMBAD-derived Abell planetary-nebula layer

- Database: SIMBAD, operated at CDS, Strasbourg, France
- Source: https://simbad.cds.unistra.fr/
- Database licence: Open Database License (ODbL) 1.0
- Requested acknowledgement: this product makes use of the SIMBAD database, operated at CDS, Strasbourg, France.

The derived catalogue files retain their upstream/data-set licensing. AstroPlanner's local cache is only a delivery mechanism and does not change those terms.
