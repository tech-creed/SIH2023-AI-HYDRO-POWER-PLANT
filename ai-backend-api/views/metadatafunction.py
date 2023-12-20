import math
import random
# Constants

density_water = 1000  # kg/m^3
gravity = 9.81  # m/s^2

turbine_speed_ranges = {
    "Pelton Turbine": "500-2000",
    "Francis Turbine": "180-500",
    "Kaplan Turbine": "60-200"
}

average_rotational_speed = {
    "Pelton Turbine": 1500,    
    "Francis Turbine": 300, 
    "Kaplan Turbine": 100 
}

units_dict = {

    "Head": "Meters (m)",
    "flow_rate": "Cubic Meters Per Second (m³/s)",
    "flow_velocity": "Meters Per Second (m/s)",
    "penstock_diameter": "Meters (m)",
    "penstock_thickness": "Meters (m)",
    "turbine_efficiency": "Percentage (%)",
    "hydro_poweroutput": "Watts (W)"
}


def hydro_power_production(Q, H):

    efficiency= random.uniform(0.8,0.9)
    # Calculate power production
    power = efficiency * density_water * gravity * Q * H

    return power
    # Result is in Watts


def calculate_penstock_diameter(flow_rate, flow_velocity):
    # Constants
    pi = math.pi

    # Calculate penstock diameter
    diameter = math.sqrt((4 * flow_rate) / (pi * flow_velocity))

    return round(diameter,6)
    # Result in meters


def calculate_pressure(density, gravity, head):
    """
    Calculate pressure in a fluid column.

    Parameters:
    - density: Density of the fluid (kg/m^3)
    - gravity: Acceleration due to gravity (m/s^2)
    - head: Head of the fluid (m)

    Returns:
    - Pressure (P) in Pascals (Pa)
    """
    pressure = density * gravity * head
    return pressure


def calculate_penstock_thickness(pressure, diameter, material_type):
    material_type = material_type.lower()
    # Material properties
   
    if material_type == "steel":
        tensile_strength = 515  # MPa - megapascals
        safety_factor = 1.64
    elif material_type == "concrete":
        tensile_strength = 40  # MPa
        safety_factor = 1.5
    else:
        raise ValueError("Invalid material type. Please enter 'steel' or 'concrete'.")

    # Calculate penstock thickness
    thickness = (pressure * diameter) / (2 * tensile_strength * safety_factor)
    thickness = thickness/1000

    return round(thickness,6)
    # Result in meters


def select_turbine_type(Q, H):

    # Estimate Rotational Speed (N) using the formula
    N = 60 * Q / H

    # Estimate Specific Speed (Ns)
    Ns = N * (H / Q**0.5) / (gravity**0.5)


    # Determine the turbine type based on specific speed
    if Ns > 300:
        turbine_type = "Pelton Turbine"
    elif 100 <= Ns <= 300:
        turbine_type = "Francis Turbine"
    elif Ns <= 200:
        turbine_type = "Kaplan Turbine"
    else:
        turbine_type = "Unknown"

    return turbine_type



def select_generator_with_excitation(turbine_type, speed_range):
    # Convert speed range to RPM values
    min_speed, max_speed = map(int, speed_range.split('-'))

    # Preliminary generator type selection based on turbine type and speed range
    if turbine_type == 'Pelton Turbine':
        if min_speed >= 500 and max_speed <= 2000:
            generator_type = 'High-speed synchronous'
            excitation_system = 'Permanent magnets or direct-coupled exciter'
        else:
            generator_type = 'Unknown'
            excitation_system = 'Unknown'

    elif turbine_type == 'Francis Turbine':
        if min_speed >= 180 and max_speed <= 500:
            generator_type = 'Medium-speed synchronous'
            excitation_system = 'Indirect-coupled exciter'
        else:
            generator_type = 'Unknown'
            excitation_system = 'Unknown'

    elif turbine_type == 'Kaplan Turbine':
        if min_speed >= 60 and max_speed <= 200:
            generator_type = 'Low-speed synchronous (multi-pole)'
            excitation_system = 'Indirect-coupled exciter (synchronous) or variable-frequency control (asynchronous)'
        else:
            generator_type = 'Unknown'
            excitation_system = 'Unknown'

    else:
        generator_type = 'Unknown'
        excitation_system = 'Unknown'

    return generator_type, excitation_system



def calculate_turbine_efficiency(H,Q):
    # Calculate turbine efficiency: eta_turbine = P_hydraulic / P_mechanical
    efficiency = random.uniform(0.8,0.9)
    power_output = efficiency * density_water * gravity * Q * H
    eta_turbine = power_output / (density_water*gravity*Q*H)
    return eta_turbine


def metadata_analysis(Head, flow_rate, flow_velocity, penstock_material):

    result={}
    pressure = calculate_pressure(density_water,gravity,Head)
    penstock_diameter = calculate_penstock_diameter(flow_rate,flow_velocity)
    penstock_thickness = calculate_penstock_thickness(pressure,penstock_diameter,penstock_material)
    turbine_type = select_turbine_type(flow_rate,Head)
    speed_range = turbine_speed_ranges[turbine_type]
    generator_type, excitation_system = select_generator_with_excitation(turbine_type,speed_range)
    turbine_efficiency = calculate_turbine_efficiency(Head,flow_rate)
    hydro_poweroutput = hydro_power_production(flow_rate,Head)
    result["penstock_diameter"] = penstock_diameter
    result["penstock_thickness"] = penstock_thickness
    result["turbine_type"] = turbine_type
    result["generator_type"] = generator_type
    result["excitation_system"] = excitation_system
    result["turbine_efficiency"] = turbine_efficiency
    result["hydro_poweroutput"] = hydro_poweroutput
  
    return result


"""
    Analyzes metadata for the design of a hydropower plant.

    function name : metadata_analysis

    Parameters:
    - Head (float): The head, which is the height difference between the water source and the turbine (in meters).
    - flow_rate (float): The flow rate of water through the turbine (in cubic meters per second).
    - flow_velocity (float): The flow velocity of water in the penstock (in meters per second).
    - penstock_material (str): The material type of the penstock (e.g., 'Steel', 'Concrete').

    Returns:
    - dict: A dictionary containing metadata analysis results with the following keys:
        - 'penstock_diameter' (float): Diameter of the penstock (in meters).
        - 'penstock_thickness' (float): Thickness of the penstock (in meters).
        - 'turbine_type' (str): Type of turbine selected based on flow rate and head.
        - 'generator_type' (str): Type of generator selected based on turbine type and speed range.
        - 'excitation_system' (str): Type of excitation system selected for the generator.
        - 'turbine_efficiency' (float): Efficiency of the selected turbine.
        - 'hydro_poweroutput' (float): Hydroelectric power output of the system (in watts).

    """
