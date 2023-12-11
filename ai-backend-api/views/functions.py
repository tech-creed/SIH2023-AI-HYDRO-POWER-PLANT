def calculate_hydro_power(eta_total, water_density, gravity, flow_rate, head_height):
    return eta_total * water_density * gravity * flow_rate * head_height

def calculate_turbine_efficiency(power_turbine, water_density, gravity, flow_rate, head_height):
    return power_turbine / (water_density * gravity * flow_rate * head_height)

def calculate_generator_efficiency(power_generator, power_turbine):
    return power_generator / power_turbine

def calculate_penstock_head_losses(friction_factor, velocity, gravity):
    return (friction_factor * velocity**2) / (2 * gravity)

def estimate_turbine_size(flow_rate, head_height):
    # A simplistic estimation, actual design requires detailed engineering analysis
    turbine_diameter = (flow_rate / 10) ** 0.5  # Adjust the factor based on specific design considerations
    return turbine_diameter

def estimate_generator_size(power_output):
    # A simplistic estimation, actual design requires detailed engineering analysis
    generator_capacity = power_output * 1.2  # Adjust the factor based on specific design considerations
    return generator_capacity

def estimate_penstock_size(flow_rate, desired_velocity):
    # A simplistic estimation, actual design requires detailed engineering analysis
    penstock_diameter = (4 * flow_rate / (3.14 * desired_velocity)) ** 0.5
    return penstock_diameter


def classify_hydro_type(capacity, reservoir_size, presence_of_dam):
    if reservoir_size > 1000 and presence_of_dam:
        return "Reservoir-Based"
    elif capacity > 100 and not presence_of_dam:
        return "Run-of-River"
    elif reservoir_size > 1000 and capacity > 500:
        return "Pumped Storage"
    else:
        return "Unknown"
