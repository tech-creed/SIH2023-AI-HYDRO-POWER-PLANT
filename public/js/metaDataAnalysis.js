document.getElementById('meta-data').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);
    
    fetch('http://localhost:3000/calculator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json(); 
      })
      .then(data => {
        console.log('Response:', data);
        displayHydroComponents(data); 
        const jsonData = JSON.stringify(data);
        localStorage.setItem('metaData', jsonData);
        document.getElementById('I1').innerHTML = '<strong>Excitation System:</strong>' + data.excitation_system;
        document.getElementById('I2').innerHTML = '<strong>Generator Type:</strong>' + data.generator_type;
        document.getElementById('I3').innerHTML = '<strong>Hydro Power Output:</strong>' + data.hydro_poweroutput;
        document.getElementById('I4').innerHTML = '<strong>Penstock Diameter:</strong>' + data.penstock_diameter;
        document.getElementById('I5').innerHTML = '<strong>Penstock Thickness:</strong>' + data.penstock_thickness;
        document.getElementById('I6').innerHTML = '<strong>Turbine Efficiency:</strong>' + data.turbine_efficiency;
        document.getElementById('I7').innerHTML = '<strong>Turbine Type:</strong>' + data.turbine_type;
        var output3D = document.querySelector('.output3D')
        output3D.style.display = 'block'
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      })
})

function displayHydroComponents(data) {
  displayGenerator(data.generator_type);
  displayPenstock(data.penstock_type);
  displayTurbine(data.turbine_type);
}

// description data

const lowSpeedGeneratorData = {
  "name": "Low-Speed Synchronous Generator (Multi-pole)",
  "description": "Low-speed synchronous generators with multiple poles are commonly employed in large-scale hydroelectric power plants. Their low rotational speeds and robust design make them well-suited for applications with high torque requirements, such as large water turbines.",
  "power_output_range": "The power output range for low-speed synchronous generators typically extends from 1 MW to several hundred megawatts, depending on the specific design and scale of the power plant.",
  "power_consumption": "Low-speed synchronous generators, while exhibiting higher power consumption compared to high-speed counterparts, are valued for their reliability and durability in large-scale power generation.",
  "operational_speed_range": "Operational speed ranges for low-speed synchronous generators with multiple poles are generally between 50 and 300 RPM, providing high torque for efficient energy conversion.",
}

const mediumSpeedGenData = {
  "name": "Medium-Speed Synchronous Generator",
  "description": "Medium-speed synchronous generators find application in a range of power generation systems, including marine propulsion and certain industrial setups. They operate at intermediate speeds, offering a balance between the compact design of high-speed generators and the robustness of low-speed generators.",
  "power_output_range": "The power output range for medium-speed synchronous generators typically spans from 1 MW to 100 MW, making them suitable for a variety of medium-scale power generation projects.",
  "power_consumption": "Medium-speed synchronous generators exhibit moderate power consumption, contributing to their efficiency in converting mechanical energy into electrical power.",
  "operational_speed_range": "The operational speed range of a medium-speed synchronous generator is generally between 300 and 1500 RPM, providing flexibility in various applications."
}

const highSpeedGenData = {
  "name": "High-Speed Synchronous Generator",
    "description": "High-speed synchronous generators are commonly used in applications where compact size and high rotational speeds are required. They operate at speeds significantly higher than conventional synchronous generators, making them suitable for certain types of hydro and wind power applications.",
    "power_output_range": "The power output range for high-speed synchronous generators typically varies from 1 MW to 50 MW, depending on the specific design and application.",
    "power_consumption": "The power consumption of high-speed synchronous generators is relatively low, contributing to their efficiency in converting mechanical energy into electrical power.",
    "operational_speed_range": "Operational speed ranges from 1500 to 3000 RPM, allowing for efficient energy conversion at high rotational speeds."
}

const kaplanTurbineData = {
  "name": "Kaplan Turbine",
  "description": "The Kaplan turbine, an axial-flow turbine, is designed for low-head, high-flow hydropower applications. Notable for its adjustable blades, the Kaplan turbine ensures optimal performance across varying water flow conditions. This type of turbine is particularly suitable for locations with limited hydraulic head but abundant water volume. Kaplan turbines are known for their efficiency in converting the kinetic energy of water into mechanical energy.",
  "power_consumption": "Power consumption for Kaplan turbines typically ranges from 100 kW to 20 MW, making them ideal for low-head hydropower plants where other turbine types may be less efficient.",
  "rotational_speed": "The rotational speed of a Kaplan turbine generally falls within the range of 150 to 300 RPM, enabling effective energy capture in low-head conditions and offering stability in operation."
}

const francisTurbineData = {
  "name": "Francis Turbine",
  "description": "The Francis turbine, a reaction turbine, is widely employed in medium to low-head hydropower applications. Characterized by its versatile design with both radial and axial flow components, the Francis turbine efficiently captures energy as water enters under pressure and exits at a lower pressure. This type of turbine is adaptable to varying flow rates and head conditions, offering reliable and efficient performance in a range of scenarios.",
  "power_consumption": "Power consumption for Francis turbines typically ranges from 100 kW to 100 MW, making them suitable for a variety of hydropower plant sizes and configurations.",
  "rotational_speed": "The rotational speed of a Francis turbine generally falls within the range of 250 to 1000 RPM, providing flexibility in adapting to different operating conditions and optimizing energy conversion."
}

const peltonTurbineData = {
  "name": "Pelton Turbine",
  "description": "The Pelton turbine, designed for high-head hydropower applications, is an impulse turbine renowned for its distinctive spoon-shaped buckets. These buckets efficiently harness the energy of high-velocity water jets, converting them into rotational motion. Pelton turbines are particularly effective in scenarios with steep elevation drops and limited flow rates. Due to their design, they exhibit high power output, making them well-suited for locations with significant hydraulic head.",
  "power_consumption": "Power consumption for Pelton turbines typically ranges from 1 MW to 100 MW, depending on the specific installation and design parameters.",
  "rotational_speed": "The rotational speed of a Pelton turbine generally falls within the range of 150 to 600 revolutions per minute (RPM), allowing for efficient energy conversion in high-head conditions."
}

function displayGenerator(generatorType) {
  switch (generatorType) {
    case 'Low-speed synchronous (multi-pole)':
      document.getElementById('generatorType').textContent = 'Information for Low-speed synchronous (multi-pole) generator';
      document.getElementById('genComponentDescription').innerHTML = '<strong>Description: </strong>' + lowSpeedGeneratorData.description;
  document.getElementById('genPowerConsumption').innerHTML = '<strong>Power Consumption: </strong>' +  lowSpeedGeneratorData.power_consumption;
  document.getElementById('genRotationalSpeed').innerHTML = '<strong>Operational Speed Ranges: </strong>' +  lowSpeedGeneratorData.operational_speed_range;
      loadModel('3D assets/low_speed_gen.glb', 'generatorViewer');
      break;
    case 'High-speed synchronous':
      document.getElementById('generatorType').textContent = 'Information for High-speed synchronous';
      document.getElementById('genComponentDescription').innerHTML = '<strong>Description: </strong>' + mediumSpeedGenData.description;
  document.getElementById('genPowerConsumption').innerHTML = '<strong>Power Consumption: </strong>' +  mediumSpeedGenData.power_consumption;
  document.getElementById('genRotationalSpeed').innerHTML = '<strong>Operational Speed Ranges: </strong>' +  mediumSpeedGenData.operational_speed_range;

      loadModel('3D assets/high_speed_gen.glb', 'generatorViewer');
      break;
    case 'Medium-speed synchronous':
      document.getElementById('generatorType').textContent = 'Information for Medium-speed synchronous';
      document.getElementById('genComponentDescription').innerHTML = '<strong>Description: </strong>' + mediumSpeedGenData.description;
  document.getElementById('genPowerConsumption').innerHTML = '<strong>Power Consumption: </strong>' +  mediumSpeedGenData.power_consumption;
  document.getElementById('genRotationalSpeed').innerHTML = '<strong>Operational Speed Ranges: </strong>' +  mediumSpeedGenData.operational_speed_range;
      loadModel('3D assets/medium_speed_gen.glb', 'generatorViewer');
      break;
    default:
      break;
  }
}

function displayPenstock(penstockType) {
  switch (penstockType) {
    case 'steel':
      document.getElementById('penstockInfo').innerHTML = '<strong>Description: </strong>Steel penstocks are constructed using high-quality steel materials, such as stainless steel or carbon steel. They are durable, corrosion-resistant, and suitable for various industrial applications.';
      document.getElementById('penstockType').innerHTML = 'Information for Steel Penstock';

      loadModel('3D assets/steel_penstock.glb', 'penstockViewer');
      break;
    case 'concrete':
      document.getElementById('penstockInfo').innerHTML = '<strong>Description: </strong>Concrete penstocks are constructed using reinforced concrete, offering high strength and durability. They are commonly used in dam and reservoir projects due to their ability to withstand high pressures.';
      document.getElementById('penstockType').innerHTML = 'Information for Concrete Penstock';
      loadModel('3D assets/concrete_penstock.glb', 'penstockViewer');
      break;
    default:
      break;
  }
}

function displayTurbine(turbineType) {
  switch (turbineType) {
    case 'Kaplan Turbine':
      document.getElementById('turbineType').textContent = 'Information for Kaplan Turbine';
      document.getElementById('turComponentDescription').innerHTML = '<strong>Description: </strong>' + kaplanTurbineData.description;
  document.getElementById('turPowerConsumption').innerHTML = '<strong>Power Consumption: </strong>' + kaplanTurbineData.power_consumption;
  document.getElementById('turRotationalSpeed').innerHTML = '<strong>Rotational Speed: </strong>' + kaplanTurbineData.rotational_speed;
      loadModel('3D assets/kaplan_turbine.glb', 'turbineViewer');
      break;
    case 'Pelton Turbine':
      document.getElementById('turbineType').textContent = 'Information for Pelton Turbine';
      document.getElementById('turComponentDescription').innerHTML = '<strong>Description: </strong>' + peltonTurbineData.description;
  document.getElementById('turPowerConsumption').innerHTML = '<strong>Power Consumption: </strong>' + peltonTurbineData.power_consumption;
  document.getElementById('turRotationalSpeed').innerHTML = '<strong>Rotational Speed: </strong>' + peltonTurbineData.rotational_speed;
      loadModel('3D assets/pelton_turbine.glb', 'turbineViewer');
      break;
    case 'Francis Turbine':
      document.getElementById('turbineType').textContent = 'Information for Francis Turbine';
      document.getElementById('turComponentDescription').innerHTML = '<strong>Description: </strong>' + francisTurbineData.description;
  document.getElementById('turPowerConsumption').innerHTML = '<strong>Power Consumption: </strong>' + francisTurbineData.power_consumption;
  document.getElementById('turRotationalSpeed').innerHTML = '<strong>Rotational Speed: </strong>' + francisTurbineData.rotational_speed;
      loadModel('3D assets/francis_turbine.glb', 'turbineViewer');
      break;
    default:
      break;
  }
}

function loadModel(modelPath, viewerId) {
  const modelViewer = document.getElementById(viewerId);
  modelViewer.setAttribute('src', modelPath);
}